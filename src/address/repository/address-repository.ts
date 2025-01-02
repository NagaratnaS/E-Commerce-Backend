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
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Address } from '../entity/address.entity';

export class AddressRepository extends Repository<Address> {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {
    super(
      addressRepository.target,
      addressRepository.manager,
      addressRepository.queryRunner,
    );
  }
  public async createAddress(addressEntity: Address): Promise<Address> {
    const newAddress = this.addressRepository.create(addressEntity);
    return this.addressRepository.save(newAddress);
  }

  public async updateAddress(
    id: number,
    addressEntity: Address,
  ): Promise<string> {
    await this.addressRepository.update(id, addressEntity);
    return `Update successful for record with id - ${id}`;
  }

  public async deleteAddress(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }

  public async findAddressByUserId(userId: number): Promise<Address[]> {
    return this.addressRepository.findBy({ userId: userId });
  }
}
