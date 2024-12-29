import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user-repository-impl';
import { createHash } from './utils/utils';
import { GetUserDto } from './dto/get-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    // this.userRepository = this.userRepository;
  }
  async create(createUserDto: CreateUserDto): Promise<string> {
    const user: User = this.userRepository.create();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;
    user.gender = createUserDto.gender;
    user.phoneNumber = createUserDto.phoneNumber;
    user.email = createUserDto.email;
    user.role = createUserDto.role;
    const hashedPassword = await createHash(createUserDto.password);
    user.password = hashedPassword;
    const userCreated = await this.userRepository.createUser(user);
    return 'The User is created';
  }

  async isPasswordMatch(getUserDto: GetUserDto): Promise<boolean> {
    const userRetrievedByEmail = await this.findByEmail(getUserDto.email);
    const passwordInDb = userRetrievedByEmail.password;
    const isMatch = await bcrypt.compare(getUserDto.password, passwordInDb);
    return isMatch;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  }

  async update(id: number, patchUserDto: UpdateUserDto): Promise<string> {
    const user: User = this.userRepository.create();
    user.firstName = patchUserDto.firstName;
    user.lastName = patchUserDto.lastName;
    user.age = patchUserDto.age;
    user.gender = patchUserDto.gender;
    user.phoneNumber = patchUserDto.phoneNumber;
    user.email = patchUserDto.email;
    user.role = patchUserDto.role;
    return await this.userRepository.updateUser(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  async generateToken(getUserDto: GetUserDto) {
    const isMatch = await this.isPasswordMatch(getUserDto);
    if (isMatch) {
      const userRetrievedByEmail = await this.findByEmail(getUserDto.email);
      const payload = {
        username: userRetrievedByEmail.email,
        sub: userRetrievedByEmail.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
