// src/api/user/userService.ts
import { StatusCodes } from 'http-status-codes';
import type { User } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { ServiceResponse } from '@repo/models';
import { baseLogger } from '@repo/middleware';

const logger = baseLogger.child({ module: 'UserService' });

export class UserService {
  private userRepository = new UserRepository();

  async findAll(): Promise<ServiceResponse<User[] | null>> {
    try {
      const users = await this.userRepository.findAllUserAsync();
      if (!users.length) {
        return ServiceResponse.failure(
          "No users found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<User[]>(
        "Users found",
        users
      );
    } catch (ex) {
      const msg = `Error finding all users: ${(ex as Error).message}`;
      logger.error(msg);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findById(id: string): Promise<ServiceResponse<User | null>> {
    try {
      const user = await this.userRepository.findUserByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure(
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<User>(
        "User found",
        user
      );
    } catch (ex) {
      const msg = `Error finding user with id ${id}: ${(ex as Error).message}`;
      logger.error(msg);
      return ServiceResponse.failure(
        "An error occurred while finding user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const userService = new UserService();
