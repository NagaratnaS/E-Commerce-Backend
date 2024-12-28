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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.userService.create(createUserDto);
  }

  @Get('/login')
  @ApiOperation({ summary: 'Login a User' })
  @ApiResponse({
    status: 200,
    description: 'User Successfully Logged in.',
    type: [GetUserDto],
  })
  isPasswordMatch(@Query() query: GetUserDto) {
    return this.userService.isPasswordMatch(query);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Retrieve a user by email' })
  @ApiParam({ name: 'email', description: 'Unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved.',
    type: GetUserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(
    @Param('id') id: string,
    @Body() patchUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.userService.update(+id, patchUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
