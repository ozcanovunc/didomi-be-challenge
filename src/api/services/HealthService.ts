import { Injectable } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) { }

  check(): any {
    return this.health.check([
      async () => this.db.pingCheck('typeorm')
    ]);
  }
}
