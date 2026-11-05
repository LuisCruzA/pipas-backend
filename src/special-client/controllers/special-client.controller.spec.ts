import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SpecialClientController } from './special-client.controller.js';
import { SpecialClientService } from '../services/special-client.service.js';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard.js';

describe('SpecialClientController', () => {
  let controller: SpecialClientController;
  let service: SpecialClientService;

  const mockService = {
    findAll: vi.fn().mockResolvedValue([]),
    findOne: vi.fn().mockResolvedValue({ id: 'uuid-1', nombreEmpresa: 'Test S.A.' }),
    create: vi.fn().mockImplementation((dto) => Promise.resolve({ id: 'new-uuid', ...dto })),
    update: vi.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    remove: vi.fn().mockResolvedValue({ message: 'Eliminado', id: 'uuid-1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialClientController],
      providers: [
        {
          provide: SpecialClientService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SpecialClientController>(SpecialClientController);
    service = module.get<SpecialClientService>(SpecialClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll with boolean param', async () => {
    await controller.findAll('true');
    expect(mockService.findAll).toHaveBeenCalledWith(true);

    await controller.findAll(undefined);
    expect(mockService.findAll).toHaveBeenCalledWith(undefined);
  });

  it('should call findOne with id', async () => {
    const result = await controller.findOne('uuid-1');
    expect(result).toHaveProperty('id', 'uuid-1');
    expect(mockService.findOne).toHaveBeenCalledWith('uuid-1');
  });

  it('should call create with dto', async () => {
    const dto = { nombreEmpresa: 'Empresa A', requiereFactura: true, activo: true };
    const result = await controller.create(dto as any);
    expect(result).toHaveProperty('id', 'new-uuid');
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should call update with id and dto', async () => {
    const dto = { nombreEmpresa: 'Empresa Renovada' };
    const result = await controller.update('uuid-1', dto);
    expect(result).toHaveProperty('nombreEmpresa', 'Empresa Renovada');
    expect(mockService.update).toHaveBeenCalledWith('uuid-1', dto);
  });

  it('should call delete with id', async () => {
    const result = await controller.delete('uuid-1');
    expect(result).toEqual({ message: 'Eliminado', id: 'uuid-1' });
    expect(mockService.remove).toHaveBeenCalledWith('uuid-1');
  });
});
