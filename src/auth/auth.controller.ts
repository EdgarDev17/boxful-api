import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { SignUpDTO } from './dto/signupDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req: Request) {
    //@ts-expect-error retorna el user
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() payload: SignUpDTO) {
    return this.authService.createUser(payload.user);
  }
}
