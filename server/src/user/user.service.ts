import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      authStrategy: createUserDto.authStrategy,
      image: createUserDto.imageUrl,
    });
    return await this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
