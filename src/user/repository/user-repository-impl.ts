import {
  EntityTarget,
  EntityManager,
  QueryRunner,
  EntityMetadata,
  SelectQueryBuilder,
  DeepPartial,
  InsertResult,
  ObjectId,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { PickKeysByType } from 'typeorm/common/PickKeysByType';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';
import { User, UserRole } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }
  public async createUser(userEntity: User): Promise<User> {
    const newUser = this.userRepository.create(userEntity);
    return this.userRepository.save(newUser);
  }

  public async updateUser(id: number, userEntity: User): Promise<string> {
    await this.userRepository.update(id, userEntity);
    return `Update successful for record with id - ${id}`;
  }

  public async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async findUserByEmail(userEmail: string): Promise<User> {
    return this.userRepository.findOneBy({ email: userEmail });
  }
}
