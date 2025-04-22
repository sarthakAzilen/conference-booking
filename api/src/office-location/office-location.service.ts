import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficeLocation } from './office-location.entity';

@Injectable()
export class OfficeLocationService {
  constructor(
    @InjectRepository(OfficeLocation)
    private readonly officeLocationRepository: Repository<OfficeLocation>,
  ) {}

  create(data: Partial<OfficeLocation>) {
    const location = this.officeLocationRepository.create(data);
    return this.officeLocationRepository.save(location);
  }

  findAll() {
    return this.officeLocationRepository.find();
  }

  update(id: string, data: Partial<OfficeLocation>) {
    return this.officeLocationRepository.update(id, data);
  }

  delete(id: string) {
    return this.officeLocationRepository.delete(id);
  }
}
