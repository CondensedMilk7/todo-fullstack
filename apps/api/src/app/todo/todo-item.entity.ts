import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  done: boolean;
}
