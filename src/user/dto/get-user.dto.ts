import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class GetUserDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id?: number;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  age: number;

  @ApiProperty({ example: 'Male', description: 'The gender of the user' })
  gender: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({
    example: UserRole.CUSTOMER,
    enum: UserRole,
    description: 'The role of the user',
  })
  role: UserRole;
}
