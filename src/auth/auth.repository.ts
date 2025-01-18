import { User } from '@prisma/client';
import { AuthRepositoryI } from './auth.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository implements AuthRepositoryI {
  // Aqui estoy inyectando la dependencia utilizando el constructor
  // Esto mantiene el codigo desacoplado gracias al patron de diseño Dependency Injection
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        country: user.country,
        lastname: user.lastname,
        password: user.password,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({});
  }
}
