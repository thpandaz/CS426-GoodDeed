// src/api/user/userController.ts
import type { RequestHandler } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

import { getUserParamsSchema, deleteUserSchema } from "./user.schema.js";
import { userService }           from "./user.service.js";
import { handleServiceResponse } from "@repo/utils";

class UserController {
  /**
   * GET /api/users
   */
  public getUsers: RequestHandler = async (_, res) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  /**
   * GET /api/users/:userId
   */
  public getUser: RequestHandler = async (req, res, next) => {
    try {
      // parse() expects the *exact* shape of your schema
      const { userId } = getUserParamsSchema.parse(req.params);

      const serviceResponse = await userService.findById(userId);
      return handleServiceResponse(serviceResponse, res);
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            message: "Invalid request parameters",
            errors:  err.flatten().fieldErrors,
          });
      }
      next(err);
    }
  };

  /**
   * DELETE /api/users/:userId
   */
  // public deleteUser: RequestHandler = async (req, res, next) => {
  //   try {
  //     const { userId } = deleteUserSchema.parse(req.params).params;
  //     const serviceResponse = await userService.deleteUser(userId);
  //     return handleServiceResponse(serviceResponse, res);
  //   } catch (err: any) {
  //     if (err instanceof ZodError) {
  //       return res
  //         .status(StatusCodes.BAD_REQUEST)
  //         .json({
  //           message: "Invalid request parameters",
  //           errors:  err.flatten().fieldErrors,
  //         });
  //     }
  //     next(err);
  //   }
  // };
}

export const userController = new UserController();
