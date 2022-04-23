import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';

import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Get()
  getData() {
    return this.TodoService.getData();
  }

  @Post()
  createItem(@Body() body: CreateItemDto) {
    return this.TodoService.createItem(body);
  }
}
