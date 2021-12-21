import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventModel } from '../models/EventModel';
import { UserModel } from '../models/UserModel';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(EventModel)
    private eventRepository: Repository<EventModel>,
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) { }

  getAllEvents(): Promise<EventModel[]> {
    this.logger.log('getAllEvents');
    return this.eventRepository.find();
  }

  async createEvent({
    userId,
    consents
  }): Promise<boolean> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      this.logger.error(`Create event failed, user doesnt exist ${userId}`);
      return false;
    }

    consents.forEach(async ({ id: consent, enabled }) => {
      const query = { consent, userId };
      const newRecord = { consent, userId, enabled };
      const existingEvent =  await this.eventRepository.findOne(query);
      if (existingEvent) {
        await this.eventRepository.update(query, { enabled });
      } else {
        await this.eventRepository.insert(newRecord);
      }
    });

    this.logger.log('Create event succeeded', { userId, consents });

    return true;
  }
}
