import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const userEmail = await this.prisma.users.findUnique({
      where: { email: createUserDto.email }
    });

    if(userEmail) throw new ConflictException();

    const data: Prisma.UsersCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    };

    await this.prisma.users.create({data});
  }
}
