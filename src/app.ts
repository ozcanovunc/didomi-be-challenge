import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './api/controllers/HealthController';
import { UserController } from './api/controllers/UserController';
import { HealthService } from './api/services/HealthService';
import { UserService } from './api/services/UserService';
import * as fs from "fs";
import { UserModel } from './api/models/UserModel';
import { EventModel } from './api/models/EventModel';
import { EventController } from './api/controllers/EventController';
import { EventService } from './api/services/EventService';
import { TerminusModule } from '@nestjs/terminus';
import { AuditModel } from './api/models/AuditModel';
import { AuditService } from './api/services/AuditService';
import { AuditController } from './api/controllers/AuditController';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DB_NAME,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      dropSchema: false,
      logging: true,
      ssl: {
        ca: fs.readFileSync(process.env.DB_CERT).toString(),
      },
      entities: [
        UserModel,
        EventModel,
        AuditModel,
      ]
    }),
    TerminusModule,
    TypeOrmModule.forFeature([
      UserModel,
      EventModel,
      AuditModel,
    ]),
  ],
  controllers: [
    UserController,
    HealthController,
    EventController,
    AuditController,
  ],
  providers: [
    UserService,
    HealthService,
    EventService,
    AuditService,
  ],
})
export class AppModule { }
