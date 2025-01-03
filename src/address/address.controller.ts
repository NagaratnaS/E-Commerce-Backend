import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/patch-address.dto';
import { GetAddressDto } from './dto/get-address.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Address')
@Controller('address')
@ApiBearerAuth('JWT-auth')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Address' })
  @ApiResponse({ status: 201, description: 'Address successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createAddressDto: CreateAddressDto,
    @Req() req,
  ): Promise<string> {
    const email = req.user.email;
    return this.addressService.create(createAddressDto, email);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve an Address by user Id' })
  @ApiResponse({
    status: 200,
    description: 'Address successfully retrieved.',
    type: GetAddressDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  findByUserId(@Req() req) {
    const email = req.user.email;
    return this.addressService.findByUserId(email);
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
