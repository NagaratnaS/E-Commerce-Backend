import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AddressRepository } from './repository/address-repository';
import { Address } from './entity/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UserModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, JwtService],
  exports: [AddressService, TypeOrmModule],
})
export class AddressModule {}
