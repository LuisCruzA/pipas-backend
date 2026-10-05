import { Test, TestingModule } from '@nestjs/testing';
import { StaticsService } from './statics.service.js';

describe('StaticsService', () => {
  let service: StaticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaticsService],
    }).compile();

    service = module.get<StaticsService>(StaticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
