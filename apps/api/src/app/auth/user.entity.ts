import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoItem } from '../todo/todo-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.user)
  todos: TodoItem[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
