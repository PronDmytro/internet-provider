import {Test, TestingModule} from '@nestjs/testing';
import {WorkStatusService} from './work-status.service';

describe('WorkStatusService', () => {
  let service: WorkStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkStatusService],
    }).compile();

    service = module.get<WorkStatusService>(WorkStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
