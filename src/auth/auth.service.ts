import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaRepository } from 'src/prisma/prisma.repository';
import { SignInDTO } from './dto/signinDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Aqui estoy inteyetando las dependencias que utilizaré
  constructor(
    private prismaRepository: PrismaRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(user: User) {
    const salt = 10;
    const hash = await bcrypt.hash(user.password, salt);

    const newUser = await this.prismaRepository.createUser({
      country: user.country,
      email: user.email,
      lastname: user.lastname,
      name: user.name,
      password: hash,
    });

    if (!newUser) {
      return {
        error: 'Error al crear cuenta',
      };
    }

    //agrega sus respecticas validaciones
    return this.jwtService.sign({
      country: user.country,
      email: user.email,
      lastname: user.lastname,
      name: user.name,
      id: user.id,
    });
  }

  async validateUser({ email, password }: SignInDTO) {
    const user = await this.prismaRepository.getUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatch) {
      //Si todo sale bien, Firmo el JWT para enviarlo al cliente junto a la session
      // enviamos el payload libre de la contraseña
      return {
        country: user.country,
        email: user.email,
        lastname: user.lastname,
        name: user.name,
        id: user.id,
      };
    }
    return null;
  }

  async login(user: User) {
    console.log('antes de firmarlo', user);
    return {
      access_token: this.jwtService.sign({
        country: user.country,
        email: user.email,
        lastname: user.lastname,
        name: user.name,
        id: user.id,
      }),
    };
  }
}
