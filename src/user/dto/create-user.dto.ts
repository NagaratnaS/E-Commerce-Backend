import { ApiProperty } from '@nestjs/swagger';
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

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  @Length(1, 255)
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  @Length(1, 255)
  lastName: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @ApiProperty({ example: 'Male', description: 'The gender of the user' })
  @IsString()
  @Length(1, 50)
  gender: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
  })
  @IsString()
  @Length(10, 10)
  phoneNumber: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'The password for the user. Must be strong.',
  })
  @IsString()
  @Length(8, 255)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({
    example: UserRole.CUSTOMER,
    enum: UserRole,
    description: 'The role of the user',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
