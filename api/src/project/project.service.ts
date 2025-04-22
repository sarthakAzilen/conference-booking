import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  create(data: CreateProjectDto) {
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  findAll() {
    return this.projectRepository.find();
  }

  update(id: string, data: Partial<CreateProjectDto>) {
    return this.projectRepository.update(id, data);
  }

  delete(id: string) {
    return this.projectRepository.delete(id);
  }
}
