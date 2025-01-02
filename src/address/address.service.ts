import { Injectable } from '@nestjs/common';
import { AddressRepository } from './repository/address-repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entity/address.entity';
import { UpdateAddressDto } from './dto/patch-address.dto';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  async create(createAddressDto: CreateAddressDto): Promise<string> {
    const userAddress: Address = this.addressRepository.create();
    userAddress.userId = createAddressDto.userId;
    userAddress.addressLine1 = createAddressDto.addressLine1;
    userAddress.addressLine2 = createAddressDto.addressLine2;
    userAddress.city = createAddressDto.city;
    userAddress.state = createAddressDto.state;
    userAddress.postalCode = createAddressDto.postalCode;
    userAddress.country = createAddressDto.country;
    userAddress.addressType = createAddressDto.addressType;
    await this.addressRepository.createAddress(userAddress);
    return 'The User Address is created';
  }

  async findByUserId(userId: number): Promise<Address[]> {
    return await this.addressRepository.findAddressesByUserId(userId);
  }

  async findByPublicId(publicId: string): Promise<Address> {
    return this.addressRepository.findOneBy({ publicId: publicId });
  }

  async update(
    publicId: string,
    patchAddressDto: UpdateAddressDto,
  ): Promise<string> {
    const userByPublicId = await this.findByPublicId(publicId);
    const userAddress: Address = this.addressRepository.create();
    userAddress.userId = patchAddressDto.userId;
    userAddress.addressLine1 = patchAddressDto.addressLine1;
    userAddress.addressLine2 = patchAddressDto.addressLine2;
    userAddress.city = patchAddressDto.city;
    userAddress.state = patchAddressDto.state;
    userAddress.postalCode = patchAddressDto.postalCode;
    userAddress.country = patchAddressDto.country;
    userAddress.addressType = patchAddressDto.addressType;
    return await this.addressRepository.updateAddress(
      userByPublicId.id,
      userAddress,
    );
  }

  async remove(publicId: string): Promise<void> {
    const userByPublicId = await this.findByPublicId(publicId);
    await this.addressRepository.deleteAddress(userByPublicId.id);
  }
}
