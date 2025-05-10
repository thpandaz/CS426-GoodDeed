import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";

interface Coordinates {
    lat: number;
    long: number;
}

interface Location {
    city: string;
    country: string;
    state: string;
    coordinates: Coordinates;
}

interface Reputation {
    score: number;
    amount_of_reviews: number;
}

interface UserObject {
    uuid: string;
    clerkId: string;
    name: string;
    email: string;
    location: Location;
    phone: string;
    preference: UserPreference[];
    reputation: Reputation;
    events: EventObject[];
    certifications: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface EventObject {
    uuid: string;
    name: string;
}

enum UserPreference {
    ANIMAL_WELFARE = "ANIMAL_WELFARE",
    ENVIRONMENT = "ENVIRONMENT",
    EDUCATION = "EDUCATION",
    HEALTH = "HEALTH",
    COMMUNITY = "COMMUNITY",
    TECHNOLOGY = "TECHNOLOGY",
    ARTS_CULTURE = "ARTS_CULTURE",
    SPORTS_RECREATION = "SPORTS_RECREATION",
    HUMAN_RIGHTS = "HUMAN_RIGHTS",
    DISASTER_RELIEF = "DISASTER_RELIEF",
}

interface IUserDocument extends UserObject, Document {
    uuid: string;
}

const CoordinatesSchema = new Schema<Coordinates>({
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
}, { _id: false });

const LocationSchema = new Schema<Location>({
    city: { type: String, required: false, default: '' },
    country: { type: String, required: false, default: '' },
    state: { type: String, required: false, default: '' },
    coordinates: { type: CoordinatesSchema, required: true },
}, { _id: false });

const ReputationSchema = new Schema<Reputation>({
    score: { type: Number, default: 0 },
    amount_of_reviews: { type: Number, default: 0 },
}, { _id: false });

const EventSchema = new Schema({
    uuid: { type: String, required: true },
    name: { type: String },
}, { _id: false });

const UserSchema = new Schema<IUserDocument>({
    uuid: { type: String, required: true, unique: true, index: true },
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    location: { type: LocationSchema, required: true },
    phone: { type: String, required: false, default: '' },
    preference: [{ type: String, enum: Object.values(UserPreference), required: false, default: [] }],
    reputation: { type: ReputationSchema, required: true, default: () => ({ score: 0, amount_of_reviews: 0 }) },
    events: [{ type: EventSchema, required: false, default: [] }],
    certifications: [{ type: String, required: false, default: [] }],
}, { timestamps: true });

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

const PORT = process.env.PORT || 3000;
const REGISTRY_URL = process.env.REGISTRY_URL || "http://registry:5001";
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "users_db";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();
app.use(express.json());

async function connectDB() {
    const dbUri = `${MONGO_URI}/${MONGO_DB_NAME}`;
    log.info(`Attempting to connect to MongoDB at: ${dbUri}`);
    try {
        await mongoose.connect(dbUri);
        log.info(`Successfully connected to MongoDB at: ${dbUri}`);
    } catch (err) {
        log.error(err, `Failed to connect to MongoDB at: ${dbUri}. Exiting.`);
        process.exit(1);
    }
}

async function registerWithRetry(name: string, url: string, maxRetries = 15) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const res = await fetch(`${REGISTRY_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, url }),
            });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            log.info("Registered with registry");
            return;
        } catch (err) {
            log.warn(
                `Failed to register (attempt ${i + 1}): ${(err as Error).message}`,
            );
            await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
        }
    }
    log.error("Could not register with registry. Exiting.");
    process.exit(1);
}

async function lookupService(name: string): Promise<string | null> {
    try {
        const res = await fetch(`${REGISTRY_URL}/lookup?name=${name}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const { url } = await res.json();
        return url;
    } catch (err) {
        log.error(`Lookup failed for ${name}: ${(err as Error).message}`);
        return null;
    }
}


// POST /register - Register a new user
app.post("/register", async (req: Request, res: Response) => {
    log.info("POST /register received");
    const { clerkId, name, email, location, phone, preference, certifications } = req.body as Partial<UserObject>;

    if (!clerkId || !name || !email) {
        return res.status(400).json({ message: "Missing required fields: clerkId, name, email" });
    }

    try {
        const existingUser = await UserModel.findOne({ $or: [{ clerkId }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: "User with this clerkId or email already exists" });
        }

        const newUser = new UserModel({
            uuid: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            clerkId,
            name,
            email,
            location: location || { city: "", country: "", state: "", coordinates: { lat: 0, long: 0 } },
            phone: phone || "",
            preference: preference || [],
            reputation: { score: 0, amount_of_reviews: 0 },
            events: [],
            certifications: certifications || [],
        });

        await newUser.save();
        log.info({ userId: newUser.uuid, clerkId: newUser.clerkId }, "User registered successfully");
        const userResponse: UserObject = newUser.toObject();
        res.status(201).json(userResponse);
    } catch (error) {
        log.error(error, "Error during user registration");
        if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 11000) {
            return res.status(409).json({ message: "User with this clerkId or email already exists (database constraint)." });
        }
        res.status(500).json({ message: "Internal server error during registration" });
    }
});

// POST /login - Login a user (mock)
app.post("/login", async (req: Request, res: Response) => {
    log.info("POST /login received (mock)");
    const { clerkId, email } = req.body;
    try {
        const userDoc = await UserModel.findOne({ $or: [{ clerkId }, { email }] });
        if (userDoc) {
            log.info({ userId: userDoc.uuid }, "Mock login successful");
            const user: UserObject = userDoc.toObject();
            res.status(200).json({ message: "Mock login successful", user });
        } else {
            res.status(401).json({ message: "Mock login failed: User not found" });
        }
    } catch (error) {
        log.error(error, "Error during mock login");
        res.status(500).json({ message: "Internal server error during login" });
    }
});

// GET /:id - Get User by ID (UUID or ClerkID)
app.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    log.info(`GET /${id} received`);
    try {
        let userDoc = await UserModel.findOne({ uuid: id });
        if (!userDoc) {
            userDoc = await UserModel.findOne({ clerkId: id });
        }

        if (userDoc) {
            const user: UserObject = userDoc.toObject();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        log.error(error, "Error fetching user by ID");
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET / - Get users, optionally filter by preference
app.get("/", async (req: Request, res: Response) => {
    log.info("GET / received with query:", req.query);
    const preferencesQuery = req.query.preference as string | string[] | undefined;

    try {
        let query = {};
        if (preferencesQuery) {
            const preferencesToFilter = (Array.isArray(preferencesQuery) ? preferencesQuery : [preferencesQuery])
                .map(p => p.toUpperCase())
                .filter(p => Object.values(UserPreference).includes(p as UserPreference)) as UserPreference[];

            if (preferencesToFilter.length > 0) {
                query = { preference: { $all: preferencesToFilter } };
                log.info({ filterQuery: query }, "Constructed filter for preferences");
            } else if (preferencesQuery && preferencesQuery.length > 0) {
                log.info({ preferencesQuery }, "Invalid or no matching preference values provided, returning 400.");
                return res.status(400).json({ message: "Invalid or no matching preference values provided." });
            }
        } else {
            log.info("No preference filter, fetching all users.");
        }
        
        log.info({ finalQuery: query }, "Executing find with query");
        const userDocs = await UserModel.find(query);
        log.info({ count: userDocs.length }, "Users found in DB");

        if (userDocs.length > 0 && userDocs[0]) {
            log.info({ firstUserId: userDocs[0].uuid }, "First user UUID from DB");
        }

        const users: UserObject[] = userDocs.map(doc => doc.toObject());
        res.status(200).json(users);
    } catch (error) {
        log.error(error, "Error fetching users");
        res.status(500).json({ message: "Internal server error" });
    }
});

// PUT /:id - Update User (UUID or ClerkID)
app.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    log.info(`PUT /${id} received`);
    const updates = req.body as Partial<UserObject>;

    const { uuid, clerkId, createdAt, updatedAt, reputation, events, ...updatableFields } = updates;

    try {
        const userDoc = await UserModel.findOneAndUpdate(
            { $or: [{ uuid: id }, { clerkId: id }] },
            { $set: { ...updatableFields, updatedAt: new Date() } },
            { new: true, runValidators: true }
        );

        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }
        log.info({ userId: userDoc.uuid }, "User updated successfully");
        const user: UserObject = userDoc.toObject();
        res.status(200).json(user);
    } catch (error) {
        log.error(error, "Error updating user");
        if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 11000) {
            return res.status(409).json({ message: "Update failed due to duplicate key (e.g., email)." });
        }
        res.status(500).json({ message: "Internal server error during update" });
    }
});

// DELETE /:id - Delete User (UUID or ClerkID)
app.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    log.info(`DELETE /${id} received`);
    try {
        const result = await UserModel.findOneAndDelete({ $or: [{ uuid: id }, { clerkId: id }] });
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        log.info({ userId: result.uuid }, "User deleted successfully");
        const user: UserObject = result.toObject();
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        log.error(error, "Error deleting user");
        res.status(500).json({ message: "Internal server error" });
    }
});


async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        log.info(`Users service listening on port ${PORT}`);
        registerWithRetry("users", `http://users:${PORT}`);
    });
}

startServer();
