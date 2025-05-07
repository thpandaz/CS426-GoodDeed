import { Router } from "express";
import { OrganizationController } from "./organization.controller.js";

const router: Router = Router();
const organizationController = new OrganizationController();

// Organization registration and management
router.post("/register", organizationController.register);
router.get("/clerk/:clerkId", organizationController.getByClerkId);
router.get("/:id", organizationController.getById);
router.put("/:id", organizationController.update);
router.delete("/:id", organizationController.delete);

// Event management
router.post("/:id/events", organizationController.addEvent);
router.delete("/:id/events/:eventId", organizationController.removeEvent);

// Reputation management
router.post("/:id/reputation", organizationController.updateReputation);

export default router; 