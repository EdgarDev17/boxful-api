import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaRepository } from 'src/prisma/prisma.repository';

interface IAuthRespository {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string, password: string): Promise<User>;
}

@Injectable()
export class AuthRespository implements IAuthRespository {
  // Dependecy injection, utilizo la inyeccion de dependencias para mantener el codigo desacoplado
  // por capas
  constructor(private prismaRepo: PrismaRepository) {}

  async createUser(user: User): Promise<void> {
    this.prismaRepo.user.create({
      data: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        country: user.country,
        password: user.password,
      },
    });
  }

  async getUserByEmail(email: string, password: string): Promise<User> {
    const user = this.prismaRepo.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('error manejarlo');
    }

    return user;
  }
}
