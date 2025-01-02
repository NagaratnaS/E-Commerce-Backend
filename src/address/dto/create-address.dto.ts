import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Length,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'ID of the user owning the address', example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'First line of the address',
    example: '123 Main St',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  addressLine1: string;

  @ApiProperty({
    description: 'Second line of the address (optional)',
    example: 'Apartment 4B',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 255)
  addressLine2?: string;

  @ApiProperty({ description: 'City name', example: 'New York' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  city: string;

  @ApiProperty({ description: 'State or province name', example: 'NY' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  state: string;

  @ApiProperty({ description: 'Postal or ZIP code', example: '10001' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  postalCode: string;

  @ApiProperty({ description: 'Country name', example: 'USA' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  country: string;

  @ApiProperty({
    description: 'Type of the address',
    enum: ['billing', 'shipping'],
    example: 'shipping',
  })
  @IsEnum(['billing', 'shipping'])
  addressType: 'billing' | 'shipping';
}
