import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const todoController = app.get<TodoController>(TodoController);
      expect(todoController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
