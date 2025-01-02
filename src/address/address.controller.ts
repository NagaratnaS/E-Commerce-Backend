import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/patch-address.dto';
import { GetAddressDto } from './dto/get-address.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Address' })
  @ApiResponse({ status: 201, description: 'Address successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAddressDto: CreateAddressDto): Promise<string> {
    return this.addressService.create(createAddressDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Retrieve an Address by user Id' })
  @ApiParam({
    name: 'userId',
    description: 'identifier of the address by user',
  })
  @ApiResponse({
    status: 200,
    description: 'Address successfully retrieved.',
    type: GetAddressDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  findByUserId(@Param('userId') userId: number) {
    return this.addressService.findByUserId(userId);
  }

  @Patch(':publicId')
  @ApiOperation({ summary: 'Update an Address' })
  @ApiParam({
    name: 'publicId',
    description: 'Unique identifier of the Address',
  })
  @ApiResponse({
    status: 200,
    description: 'Address successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  update(
    @Param('publicId') publicId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<string> {
    return this.addressService.update(publicId, updateAddressDto);
  }

  @Delete(':publicId')
  @ApiOperation({ summary: 'Delete an Address' })
  @ApiParam({
    name: 'publicId',
    description: 'Unique identifier of the Address',
  })
  @ApiResponse({
    status: 200,
    description: 'Address successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  remove(@Param('publicId') publicId: string) {
    return this.addressService.remove(publicId);
  }
}
