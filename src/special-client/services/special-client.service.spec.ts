import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SpecialClientService } from './special-client.service.js';
import { SpecialClient } from '../entities/special-client.entity.js';
import { FormaPago, MetodoPago, RegimenFiscal, UsoCfdi } from '../enums/special-client.enum.js';
import { NotFoundException } from '@nestjs/common';

describe('SpecialClientService', () => {
  let service: SpecialClientService;
  let mockRepository: any;

  const mockClient: Partial<SpecialClient> = {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    nombreEmpresa: 'Constructora El Roble',
    direccion: 'Av. Las Palmas 123',
    requiereFactura: true,
    activo: true,
    rfc: 'ROB901010ABC',
    razonSocial: 'CONSTRUCTORA EL ROBLE SA DE CV',
    regimenFiscal: RegimenFiscal.REG_601,
    usoCfdi: UsoCfdi.G03,
    metodoPago: MetodoPago.PUE,
    formaPago: FormaPago.TRANSFERENCIA,
    ingresos: [],
    createdAt: new Date(),
  };

  beforeEach(async () => {
    mockRepository = {
      find: vi.fn().mockResolvedValue([mockClient]),
      findOne: vi.fn().mockImplementation(({ where: { id } }) => {
        if (id === mockClient.id) return Promise.resolve(mockClient);
        return Promise.resolve(null);
      }),
      create: vi.fn().mockImplementation((dto) => ({ id: 'new-uuid', ...dto })),
      save: vi.fn().mockImplementation((client) => Promise.resolve(client)),
      preload: vi.fn().mockImplementation((dto) => {
        if (dto.id === mockClient.id) return Promise.resolve({ ...mockClient, ...dto });
        return Promise.resolve(null);
      }),
      remove: vi.fn().mockResolvedValue(mockClient),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialClientService,
        {
          provide: getRepositoryToken(SpecialClient),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SpecialClientService>(SpecialClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all special clients with findAll()', async () => {
    const clients = await service.findAll();
    expect(clients).toEqual([mockClient]);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: {},
      relations: { ingresos: true },
      order: { createdAt: 'DESC' },
    });
  });

  it('should filter clients by active status', async () => {
    await service.findAll(true);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { activo: true },
      relations: { ingresos: true },
      order: { createdAt: 'DESC' },
    });
  });

  it('should find one client by id', async () => {
    const client = await service.findOne('d290f1ee-6c54-4b01-90e6-d701748f0851');
    expect(client).toEqual(mockClient);
  });

  it('should throw NotFoundException if client not found', async () => {
    await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('should create a special client', async () => {
    const createDto = {
      nombreEmpresa: 'Nueva Empresa',
      requiereFactura: true,
      activo: true,
    };
    const result = await service.create(createDto as any);
    expect(result).toHaveProperty('id');
    expect(result.nombreEmpresa).toBe('Nueva Empresa');
  });

  it('should update a special client', async () => {
    const updateDto = { nombreEmpresa: 'Nombre Actualizado' };
    const result = await service.update('d290f1ee-6c54-4b01-90e6-d701748f0851', updateDto);
    expect(result.nombreEmpresa).toBe('Nombre Actualizado');
  });

  it('should remove a special client', async () => {
    const result = await service.remove('d290f1ee-6c54-4b01-90e6-d701748f0851');
    expect(result).toEqual({
      message: 'Cliente especial "Constructora El Roble" eliminado correctamente',
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    });
  });
});
