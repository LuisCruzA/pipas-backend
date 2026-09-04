import { Test, TestingModule } from '@nestjs/testing';
import { IncomesController } from './incomes.controller.js';

describe('IncomesController', () => {
  let controller: IncomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomesController],
    }).compile();

    controller = module.get<IncomesController>(IncomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
