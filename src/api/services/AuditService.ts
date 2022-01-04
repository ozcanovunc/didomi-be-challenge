import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditModel } from '../models/AuditModel';
import { EventModel } from '../models/EventModel';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditModel)
    private auditRepository: Repository<AuditModel>,
  ) { }

  public async getAuditForUser(userId: string): Promise<AuditModel[]> {
    this.logger.log(`getAuditForUser userId:${userId}`);
    return this.auditRepository.find({ userId });
  }

  public async createAuditForUser(userId: string, event: EventModel): Promise<any> {
    this.logger.log(`Will create audit log for user:${userId}`, event);
    const { consent, enabled } = event;
    this.auditRepository.insert({
      userId,
      auditLog: { consent, enabled },
      createdAt: new Date().toISOString(),
    });
  }
}
