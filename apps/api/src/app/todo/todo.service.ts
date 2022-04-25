import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteItemResponse } from '@todo/api-interfaces';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { TodoItem } from './todo-item.entity';
import * as ApiInterfaces from '@todo/api-interfaces';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoItem) private repo: Repository<TodoItem>) {}

  async getItems(user: User): Promise<{ data: ApiInterfaces.TodoItem[] }> {
    const data = await this.repo
      .createQueryBuilder('todo')
      .relation('user')
      .select('todo')
      .where('userId = :id', { id: user.id })
      .getMany();
    return { data };
  }

  createItem(body: CreateItemDto, user: User): Promise<ApiInterfaces.TodoItem> {
    const item = this.repo.create(body);
    item.user = user;
    return this.repo.save(item);
  }

  async updateItem(
    { id, description, done }: UpdateItemDto,
    user: User
  ): Promise<TodoItem> {
    const item = await this.repo
      .createQueryBuilder('todo')
      .relation('user')
      .select('todo')
      .where('todo.id = :id', { id })
      .andWhere('userId = :currentUserId', { currentUserId: user.id })
      .getOne();

    if (!item) {
      throw new NotFoundException(
        `Item with the given ID cannot be found for user ${user.username}`
      );
    }

    item.done = done || item.done;
    item.description = description || item.description;
    return this.repo.save(item);
  }

  async deleteItem(id: number, user: User): Promise<DeleteItemResponse> {
    const item = await this.repo
      .createQueryBuilder('todo')
      .relation('user')
      .select('todo')
      .where('todo.id = :id', { id })
      .andWhere('userId = :currentUserId', { currentUserId: user.id })
      .getOne();

    if (!item) {
      throw new NotFoundException(
        `Item with the given ID cannot be found for user ${user.username}`
      );
    }

    await this.repo.delete(item);
    return {
      message: 'item deleted successfully',
      itemId: id,
    };
  }
}
