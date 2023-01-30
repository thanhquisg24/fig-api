import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { TaskEntity } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.taskRepo.findOne({
      where: {
        id,
      },
    });
  }

  async create(task: TaskEntity): Promise<TaskEntity> {
    return await this.taskRepo.save(task);
  }

  async update(task: TaskEntity): Promise<UpdateResult> {
    return await this.taskRepo.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }
}
