import { HttpStatus } from "@nestjs/common";

export class Utils {
    static successResponse(message: string, data: any = null, statusCode: number = HttpStatus.OK) {
      return {
        statusCode,
        message,
        data,
      };
    }
  
    static errorResponse(message: string = 'Internal Server Error', statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR, error: any = null) {
      return {
        statusCode,
        message,
        error: error ? error.message : null,
      };
    }
  }
  