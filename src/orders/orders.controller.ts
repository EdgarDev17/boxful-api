import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderResponseDto } from './dto/orders.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard) // Proteje todas las rutas del controller
@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll(): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.ordersService.findAll();
      return orders;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<OrderResponseDto> {
    try {
      const order = await this.ordersService.findById(id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching order',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  async getByUserId(
    @Param('userId') userId: string,
  ): Promise<Partial<OrderResponseDto[]>> {
    try {
      const orders = await this.ordersService.findByUserId(userId);
      return orders;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching user orders',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createOrder(@Body() createOrderPayload: CreateOrderDto) {
    const response = await this.ordersService.createOrder(createOrderPayload);

    if (!response) {
      return {
        error: 'Error al crear la orden',
      };
    }
  }
}
