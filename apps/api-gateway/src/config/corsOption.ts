/**
 * Configuration options for Cross-Origin Resource Sharing (CORS).
 */
import { env } from "@repo/utils";

const whitelist = env.CORS_ORIGINS;

const corsOptions = {
    /**
     * Determines whether the request origin is allowed or not.
     * @param origin - The request origin.
     * @param callback - The callback function to be called with the result.
     */
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            callback(null, true);
            return;
        }

        if (whitelist.indexOf(origin) !== -1 || env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;

