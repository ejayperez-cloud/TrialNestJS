import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Full user creation (for admin/demo)
  async createUser(
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    phone_number: string | null,
    password: string,
  ) {
    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      first_name,
      last_name,
      username,
      email,
      phone_number,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  // Dedicated registration method for AuthController
  async registerUser(username: string, password: string) {
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async getAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, data: any) {
    await this.userRepository.update(id, data);
    return this.findById(id);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
