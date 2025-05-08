import { Router, Request, Response } from "express";
import userRouter from "../features/user/user.route.js";

const appRouter: Router = Router();

appRouter.get("/health", (req : Request, res : Response) => {
    res.status(200).json({ status: "ok" });
    }
);

appRouter.use("/users", userRouter);

export default appRouter;