import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaErrorEnum } from './prismaError';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Prisma } from 'prisma/generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal server Error';
    let errorCode: string = 'error 500';

    this.logger.debug(`Prisma Meta: ${JSON.stringify(exception.meta)}`);

    switch (exception.code) {
      case PrismaErrorEnum.UniqueConstraintFailed: {
        status = HttpStatus.CONFLICT;
        message = `Conflict unicity key : ${(exception.meta?.driverAdapterError as any).cause.constraint.index} for table: ${exception.meta?.modelName}`;
        errorCode = 'unique constraint is violated';
        break;
      }

      case PrismaErrorEnum.ForeignKeyConstraintFailed: {
        status = HttpStatus.BAD_REQUEST;
        message = `Bad payload with table : ${exception.meta?.modelName} for col: ${exception.meta?.field_name}`;
        errorCode = 'foreign key constraint is violated';
        break;
      }

      case PrismaErrorEnum.RecordDoesNotExist: {
        status = HttpStatus.NOT_FOUND;
        message = `record not found for table ${exception.meta?.modelName}`;
        errorCode = 'record does not exist in the database';
        break;
      }

      default:
        this.logger.error(exception.code);
        this.logger.error(exception.meta);
        break;
    }

    response.status(status).json({
      statusCode: status,
      errorCode,
      message,
    });
  }
}
