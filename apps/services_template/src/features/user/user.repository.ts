// src/api/user/userRepository.ts
import { UserModel, User } from './user.model.js';

export class UserRepository {
  async findAllUserAsync(): Promise<User[]> {
    const docs = await UserModel.find().lean().exec();
    return docs.map((d) => ({
      id:        d._id.toString(),
      name:      d.name,
      email:     d.email,
      age:       d.age,
      roles:     d.roles,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));
  }

  async findUserByIdAsync(id: string): Promise<User | null> {
    const d = await UserModel.findById(id).lean().exec();
    if (!d) return null;
    return {
      id:        d._id.toString(),
      name:      d.name,
      email:     d.email,
      age:       d.age,
      roles:     d.roles,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    };
  }

}
