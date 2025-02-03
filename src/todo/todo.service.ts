import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTodoDto: CreateTodoDto) {
    return this.prismaService.todo.create({
      data: createTodoDto,
    });
  }

  findAll() {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.todo
      .findUniqueOrThrow({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prismaService.todo
      .update({
        where: {
          id: id,
        },
        data: updateTodoDto,
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async remove(id: number) {
    return this.prismaService.todo
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }
}
