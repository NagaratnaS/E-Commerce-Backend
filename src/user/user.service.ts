import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user-repository-impl';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {
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
    const userCreated = await this.userRepository.createUser(user);
    return 'The User is created';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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

  async remove(id: number) {
    await this.userRepository.deleteUser(id);
  }
}
