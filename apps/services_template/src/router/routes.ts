import { Router, Request, Response } from "express";
import userRouter from "../features/user/user.route.js";
import organizationRouter from "../features/organization/organization.route.js";

const appRouter: Router = Router();

appRouter.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

appRouter.use("/users", userRouter);
appRouter.use("/organizations", organizationRouter);

export default appRouter;