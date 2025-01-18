import { User } from '@prisma/client';

export interface AuthRepositoryI {
  create: (user: User) => Promise<User>;
  getUserByEmail: (email: string, password: string) => Promise<User>;
}
