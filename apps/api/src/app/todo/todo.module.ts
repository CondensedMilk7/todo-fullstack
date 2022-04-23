import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './todo-item.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
