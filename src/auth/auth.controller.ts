import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/authpayload';

@Controller('auth')
export class AuthController {
  @Post('signin')
  signin(@Body() authPayload: AuthPayloadDTO) {}
}
