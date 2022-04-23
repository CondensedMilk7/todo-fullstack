import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemDto } from './dtos/item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Get()
  getItems() {
    return this.TodoService.getItems();
  }

  @Post()
  createItem(@Body() body: CreateItemDto) {
    return this.TodoService.createItem(body);
  }

  @Patch()
  updateItem(@Body() body: UpdateItemDto) {
    return this.TodoService.updateItem(body);
  }
}
