export class PackageDto {
  length: number;
  height: number;
  width: number;
  weight: number;
  content: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export class UserDto {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export class CreateOrderDto {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  destination_address: string;
  pickup_address: string;
  department: string;
  municiopio: string;
  reference: string;
  delivery_instructions: string;
  instructions: string;
  // scheduledDate: Date;
  userId: string;
  Packages: {
    id: string;
    length: string;
    height: string;
    width: string;
    weight: string;
    content: string;
  }[];
}

export class OrderResponseDto {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  destination_adress: string;
  pickup_adress: string;
  department: string;
  municiopio: string;
  reference_point: string;
  delivery_instructions: string;
  Packages: PackageDto[];
  User: UserResponseDto;
}
