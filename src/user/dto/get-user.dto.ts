import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
import { IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'The password for the user. Must be strong.',
  })
  @IsString()
  password: string;
}
