import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto, OrderResponseDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(order: CreateOrderDto) {
    try {
      return await this.ordersRepository.createOrder(order);
    } catch (error) {
      throw new Error(`Error en OrdersService.createOrder: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.ordersRepository.getAll();
    } catch (error) {
      throw new Error(`Error en OrdersService.findAll: ${error.message}`);
    }
  }

  async findById(id: string) {
    try {
      const order = await this.ordersRepository.getById(id);
      if (!order) {
        throw new Error(`ID ${id} no encontrado`);
      }
      return order;
    } catch (error) {
      throw new Error(`Error en OrdersService.findById: ${error.message}`);
    }
  }

  async findByUserId(userId: string): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.ordersRepository.getByUserId(userId);

      if (!orders.length) {
        throw new Error(`error para userID ${userId}`);
      }
      return orders;
    } catch (error) {
      throw new Error(`Error en OrdersService.findByUserId: ${error.message}`);
    }
  }
}
