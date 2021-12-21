import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { EventModel } from '../models/EventModel';
import { EventService } from '../services/EventService';
import { Response } from 'express';

@Controller('/events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  async getAllEvents(): Promise<EventModel[]> {
    return this.eventService.getAllEvents();
  }

  @Post()
  async createEvent(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<void> {
    const eventCreated = await this.eventService.createEvent({
      userId: body.user.id,
      consents: body.consents,
    });
    response
      .status(eventCreated ? HttpStatus.OK : HttpStatus.NOT_FOUND)
      .send();
  }
}
