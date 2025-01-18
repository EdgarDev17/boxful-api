import { Injectable } from '@nestjs/common';
import { AuthRespository } from './auth.repository';
import { AuthPayloadDTO } from './dto/authpayload';

export interface IAuthService {
  validateUser(authPayload: AuthPayloadDTO): void;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private respository: AuthRespository) {}

  validateUser(authpayload: AuthPayloadDTO): void {
    this.respository.getUserByEmail(authpayload.email, authpayload.password);
  }
}
