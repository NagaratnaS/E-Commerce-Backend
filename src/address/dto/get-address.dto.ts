import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetAddressDto {
  @ApiPropertyOptional({
    description: 'ID of the user owning the address',
    example: 123,
  })
  @IsInt()
  @IsOptional()
  userId?: number;
}
