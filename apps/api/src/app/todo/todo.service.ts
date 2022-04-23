import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { TodoItem } from './todo-item.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoItem) private repo: Repository<TodoItem>) {}
  getData() {
    return [];
  }

  createItem(body: CreateItemDto) {
    const item = this.repo.create(body);
    return this.repo.save(item);
  }
}
