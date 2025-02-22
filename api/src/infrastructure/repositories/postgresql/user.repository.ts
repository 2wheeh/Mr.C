import { User } from '@src/core/entities/user.entity';
import { UserRepository } from '@src/core/ports/user.repository';
import { AppErrorCode, CustomError } from '@src/error/errors';
import {
  PrismaErrorCode,
  isErrorWithCode
} from '@src/infrastructure/prisma/errors';
import {
  ExtendedPrismaClient,
  ExtendedPrismaTransactionClient
} from '@src/infrastructure/prisma/types';

export class PostgresqlUserRepository implements UserRepository {
  constructor(private readonly client: ExtendedPrismaClient) {}

  public findById = async (
    id: string,
    txClient?: ExtendedPrismaTransactionClient
  ): Promise<User> => {
    try {
      const client = txClient ?? this.client;
      const user = await client.user.findFirstOrThrow({ where: { id } });
      return user.convertToEntity();
    } catch (error: unknown) {
      if (
        isErrorWithCode(error) &&
        error.code === PrismaErrorCode.RECORD_NOT_FOUND
      ) {
        throw new CustomError({
          code: AppErrorCode.NOT_FOUND,
          cause: error,
          message: 'user not found',
          context: { id }
        });
      }
      throw new CustomError({
        code: AppErrorCode.INTERNAL_ERROR,
        cause: error,
        message: 'failed to find user by ID',
        context: { id }
      });
    }
  };

  public findByEmail = async (
    email: string,
    txClient?: ExtendedPrismaTransactionClient
  ): Promise<User> => {
    try {
      const client = txClient ?? this.client;
      const user = await client.user.findFirstOrThrow({
        where: { email }
      });
      return user.convertToEntity();
    } catch (error: unknown) {
      if (
        isErrorWithCode(error) &&
        error.code === PrismaErrorCode.RECORD_NOT_FOUND
      ) {
        throw new CustomError({
          code: AppErrorCode.NOT_FOUND,
          cause: error,
          message: 'user not found',
          context: { email }
        });
      }
      throw new CustomError({
        code: AppErrorCode.INTERNAL_ERROR,
        cause: error,
        message: 'failed to find user by email',
        context: { email }
      });
    }
  };

  public findByIds = async (
    ids: string[],
    txClient?: ExtendedPrismaTransactionClient
  ): Promise<User[]> => {
    try {
      const client = txClient ?? this.client;
      const userResults = await client.user.findMany({
        where: { id: { in: ids } }
      });
      const users = userResults.map((user) => user.convertToEntity());

      return users;
    } catch (error: unknown) {
      throw new CustomError({
        code: AppErrorCode.INTERNAL_ERROR,
        cause: error,
        message: 'failed to find users',
        context: { ids }
      });
    }
  };

  // NOTE: You should satisfy the criteria for the database upsert. https://www.prisma.io/docs/orm/reference/prisma-client-reference#database-upserts
  public upsert = async (
    userData: User,
    txClient?: ExtendedPrismaTransactionClient
  ): Promise<User> => {
    const client = txClient ?? this.client;
    let upsertUser;

    try {
      upsertUser = await client.user.upsert({
        where: {
          email: userData.email
        },
        update: {
          accessLevel: userData.accessLevel.get(),
          updatedAt: userData.updatedAt
        },
        create: {
          id: userData.id,
          nickname: userData.nickname,
          tag: userData.tag,
          idp: userData.idp.get(),
          email: userData.email,
          accessLevel: userData.accessLevel.get(),
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt
        },
        select: { id: true }
      });
    } catch (error: unknown) {
      throw new CustomError({
        code: AppErrorCode.INTERNAL_ERROR,
        cause: error,
        message: 'failed to upsert user',
        context: { userData }
      });
    }

    try {
      const foundUser = await client.user.findFirstOrThrow({
        where: { id: upsertUser.id }
      });
      return foundUser.convertToEntity();
    } catch (error: unknown) {
      if (
        isErrorWithCode(error) &&
        error.code === PrismaErrorCode.RECORD_NOT_FOUND
      ) {
        throw new CustomError({
          code: AppErrorCode.INTERNAL_ERROR,
          cause: error,
          message: 'upserted user not found',
          context: { id: upsertUser.id }
        });
      }
      throw new CustomError({
        code: AppErrorCode.INTERNAL_ERROR,
        cause: error,
        message: 'failed to find upseted user',
        context: { userData, id: upsertUser.id }
      });
    }
  };

  public deleteById = async (
    id: string,
    txClient?: ExtendedPrismaTransactionClient
  ) => {
    try {
      const client = txClient ?? this.client;
      await client.user.delete({ where: { id } });
    } catch (error: unknown) {
      if (
        isErrorWithCode(error) &&
        error.code === PrismaErrorCode.RECORD_NOT_FOUND
      ) {
        throw new CustomError({
          code: AppErrorCode.NOT_FOUND,
          message: 'user not found for deletion',
          context: { id }
        });
      }
      throw new CustomError({
        code: AppErrorCode.NOT_FOUND,
        cause: error,
        message: 'failed to delete user',
        context: { id }
      });
    }
  };
}
