import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class PrismaRepository extends PrismaClient {
  constructor() {
    super();
  }

  async createUser(user: Partial<User>): Promise<User> {
    const response = await this.user.create({
      data: {
        name: user.name,
        lastname: user.lastname,
        country: user.country,
        email: user.email,
        password: user.password,
      },
    });

    if (!response) {
      return null;
    }
    return response;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const response = await this.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!response) {
      return null;
    }

    return response;
  }
}
