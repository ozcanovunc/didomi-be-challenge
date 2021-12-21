import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from '../services/HealthService';

@Controller('/health')
export class HealthController {
	constructor(private readonly healthService: HealthService) { }

	@Get()
	@HealthCheck()
	check(): boolean {
		return this.healthService.check();
	}
}
