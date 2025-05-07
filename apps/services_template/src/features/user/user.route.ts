// src/api/user/userRoutes.ts
import { Router } from "express";
import { userController } from "./user.controller.js";

const router : Router = Router();

// List all users
router.get("/", userController.getUsers);

// Get one user by ID — note the parameter name "userId" matches your Zod schema
router.get("/:userId", userController.getUser);

// Delete a user by ID
router.delete("/:userId", userController.deleteUser);

export default router;
