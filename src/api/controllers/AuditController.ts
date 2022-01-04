import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuditModel } from '../models/AuditModel';
import { AuditService } from '../services/AuditService';

@Controller('/audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) { }

  @Get(':userId')
  async getAuditForUser(
    @Param('userId') userId,
  ): Promise<AuditModel[]> {
    return this.auditService.getAuditForUser(userId);
  }
}
