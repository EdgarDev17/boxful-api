export class SuccessResponseDTO<T> {
  data: T;
  message: string;
  statusCode: number;
}

export class ErrorResponseDTO {
  error: string;
  message: string;
  statusCode: number;
}
