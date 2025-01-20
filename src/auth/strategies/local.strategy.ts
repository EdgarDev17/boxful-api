import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // por defecto utilza username, lo cambio a email
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      email: username,
      password,
    });

    console.log('Inside LocalStrategy', user);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
