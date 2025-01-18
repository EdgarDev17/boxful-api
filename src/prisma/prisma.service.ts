import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable() // <- Convierte a esta clase en un Provider, puede ser inyectado como dependencia
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
