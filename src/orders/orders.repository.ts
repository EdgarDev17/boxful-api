import { Injectable } from '@nestjs/common';
import { Order, PrismaClient } from '@prisma/client';
import { CreateOrderDto, OrderResponseDto } from './dto/orders.dto';

@Injectable()
export class OrdersRepository extends PrismaClient {
  constructor() {
    super();
  }

  async getAll() {
    try {
      return await this.order.findMany({
        include: {
          Packages: true,
          User: {
            select: {
              id: true,
              name: true,
              lastname: true,
              email: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error fetching orders: ${error.message}`);
    }
  }

  async getById(id: string) {
    try {
      return await this.order.findUnique({
        where: {
          id,
        },
        include: {
          Packages: true,
          User: {
            select: {
              id: true,
              name: true,
              lastname: true,
              email: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error fetching order by ID: ${error.message}`);
    }
  }

  async createOrder(order: CreateOrderDto): Promise<Order> {
    const newOrder = await this.order.create({
      //@ts-expect-error convertilo a objectid
      data: order,
    });

    if (!newOrder) {
      return null;
    }

    return newOrder;
  }

  async getByUserId(userId: string): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.order.findMany({
        where: {
          userId,
        },
        include: {
          Packages: true,
          User: {
            select: {
              id: true,
              name: true,
              lastname: true,
              email: true,
            },
          },
        },
      });

      // Mapear la respuesta al DTO
      return orders.map((order) => ({
        id: order.id,
        name: order.User.name,
        lastname: order.User.lastname,
        email: order.User.email,
        phone: order.phone,
        destination_adress: order.destination_adress,
        pickup_adress: order.pickup_adress,
        department: order.department,
        municiopio: order.municiopio,
        reference_point: order.reference_point,
        delivery_instructions: order.delivery_instructions,
        Packages: order.Packages.map((pkg) => ({
          weight: pkg.weight,
          height: pkg.weight,
          length: pkg.length,
          content: pkg.content,
          width: pkg.width,
        })),
        User: {
          id: order.User.id,
          name: order.User.name,
          lastname: order.User.lastname,
          email: order.User.email,
        },
      }));
    } catch (error) {
      throw new Error(`Error fetching orders by user ID: ${error.message}`);
    }
  }
}
