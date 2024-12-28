import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
  Min,
  Max,
  Matches,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John',
    description: 'The first name of the user',
  })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  lastName?: string;

  @ApiPropertyOptional({ example: 25, description: 'The age of the user' })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({
    example: 'Male',
    description: 'The gender of the user',
  })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  gender?: string;

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'The phone number of the user',
  })
  @IsString()
  @IsOptional()
  @Length(10, 10)
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: 'P@ssw0rd!',
    description: 'The password for the user. Must be strong.',
  })
  @IsString()
  @IsOptional()
  @Length(8, 255)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character',
  })
  password?: string;

  @ApiPropertyOptional({
    example: UserRole.CUSTOMER,
    enum: UserRole,
    description: 'The role of the user',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
