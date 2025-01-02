import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AddressRepository } from './repository/address-repository';
import { Address } from './entity/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
  exports: [AddressService, TypeOrmModule],
})
export class AddressModule {}
