import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(query: FindOptionsWhere<User>) {
    return await this.usersRepository.findOne( { where: query });
  }

  async createUser(user: User) {
    const userDB = await this.usersRepository.create(user);
    return this.usersRepository.save(userDB);
  }
}
