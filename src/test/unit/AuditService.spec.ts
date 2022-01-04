import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuditModel } from "../../api/models/AuditModel";
import { AuditRepositoryFake } from "./fake/AuditRepositoryFake";
import { AuditService } from "../../api/services/AuditService";

describe('AuditService', () => {
  let auditService: AuditService;
  let auditRepository: Repository<AuditModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: getRepositoryToken(AuditModel),
          useClass: AuditRepositoryFake,
        }
      ],
    }).compile();

    auditService = module.get(AuditService);
    auditRepository = module.get(getRepositoryToken(AuditModel));
  });

  it('should return audit for user', async () => {
    const audits = await auditService.getAuditForUser('1');

    expect(audits).toHaveLength(2);
    expect(audits[0].auditLog.consent).toEqual('sms_notifications');
    expect(audits[0].auditLog.enabled).toBeFalsy();
    expect(audits[1].auditLog.consent).toEqual('email_notifications');
    expect(audits[1].auditLog.enabled).toBeTruthy();
  });
});
