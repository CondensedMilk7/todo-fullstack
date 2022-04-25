import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemDto } from './dtos/item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { TodoService } from './todo.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Get()
  // @Serialize(ItemDto)
  getItems(@CurrentUser() currentUser: User) {
    return this.TodoService.getItems(currentUser);
  }

  @Post()
  @Serialize(ItemDto)
  createItem(@Body() body: CreateItemDto, @CurrentUser() currentUser: User) {
    return this.TodoService.createItem(body, currentUser);
  }

  @Patch()
  updateItem(@Body() body: UpdateItemDto) {
    return this.TodoService.updateItem(body);
  }
}
