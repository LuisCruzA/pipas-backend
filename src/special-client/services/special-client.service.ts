import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialClient } from '../entities/special-client.entity.js';
import { CreateSpecialClientDto } from '../dto/create-special-client.dto.js';
import { UpdateSpecialClientDto } from '../dto/update-special-client.dto.js';

@Injectable()
export class SpecialClientService {
  constructor(
    @InjectRepository(SpecialClient)
    private readonly clientRepo: Repository<SpecialClient>,
  ) {}

  async findAll(activo?: boolean): Promise<SpecialClient[]> {
    const whereCondition = activo !== undefined ? { activo } : {};

    return await this.clientRepo.find({
      where: whereCondition,
      relations: {
        ingresos: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<SpecialClient> {
    const client = await this.clientRepo.findOne({
      where: { id },
      relations: {
        ingresos: true,
      },
    });

    if (!client) {
      throw new NotFoundException(`Cliente especial con ID "${id}" no encontrado`);
    }

    return client;
  }

  async create(createDto: CreateSpecialClientDto): Promise<SpecialClient> {
    const newClient = this.clientRepo.create(createDto);
    return await this.clientRepo.save(newClient);
  }

  async update(id: string, updateDto: UpdateSpecialClientDto): Promise<SpecialClient> {
    const client = await this.clientRepo.preload({
      id,
      ...updateDto,
    });

    if (!client) {
      throw new NotFoundException(`Cliente especial con ID "${id}" no encontrado`);
    }

    return await this.clientRepo.save(client);
  }

  async remove(id: string): Promise<{ message: string; id: string }> {
    const client = await this.findOne(id);
    await this.clientRepo.remove(client);
    return {
      message: `Cliente especial "${client.nombreEmpresa}" eliminado correctamente`,
      id,
    };
  }
}
