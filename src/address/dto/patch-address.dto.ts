import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, Length } from 'class-validator';

export class UpdateAddressDto {
  @ApiPropertyOptional({
    description: 'First line of the address',
    example: '456 Park Ave',
  })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  addressLine1?: string;

  @ApiPropertyOptional({
    description: 'Second line of the address (optional)',
    example: 'Suite 100',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 255)
  addressLine2?: string;

  @ApiPropertyOptional({ description: 'City name', example: 'San Francisco' })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  city?: string;

  @ApiPropertyOptional({ description: 'State or province name', example: 'CA' })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  state?: string;

  @ApiPropertyOptional({ description: 'Postal or ZIP code', example: '94101' })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Country name', example: 'USA' })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  country?: string;

  @ApiPropertyOptional({
    description: 'Type of the address',
    enum: ['billing', 'shipping'],
    example: 'billing',
  })
  @IsEnum(['billing', 'shipping'])
  @IsOptional()
  addressType?: 'billing' | 'shipping';
}
