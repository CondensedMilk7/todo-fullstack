import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { TodoItem } from './todo-item.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoItem) private repo: Repository<TodoItem>) {}
  getItems() {
    return this.repo.createQueryBuilder().select('*').getRawMany();
  }

  createItem(body: CreateItemDto) {
    const item = this.repo.create(body);
    return this.repo.save(item);
  }

  async updateItem({ id, description, done }: UpdateItemDto) {
    const item = await this.repo.findOne(id);

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    item.done = done || item.done;
    item.description = description || item.description;
    return this.repo.save(item);
  }
}
