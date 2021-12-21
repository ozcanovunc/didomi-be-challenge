import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserModel } from "../../api/models/UserModel";
import { Repository } from "typeorm";
import { UserRepositoryFake } from "./fake/UserRepositoryFake";
import { EventModel } from "../../api/models/EventModel";
import { EventRepositoryFake } from "./fake/EventRepositoryFake";
import { EventService } from "../../api/services/EventService";

describe('EventService', () => {
  let eventService: EventService;
  let usersRepository: Repository<UserModel>;
  let eventRepository: Repository<EventModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(UserModel),
          useClass: UserRepositoryFake,
        },
        {
          provide: getRepositoryToken(EventModel),
          useClass: EventRepositoryFake,
        }
      ],
    }).compile();

    eventService = module.get(EventService);
    usersRepository = module.get(getRepositoryToken(UserModel));
    eventRepository = module.get(getRepositoryToken(EventModel));
  });

  it('should return all events', async () => {
    const events = await eventService.getAllEvents();

    expect(events).toHaveLength(3);
    expect(events[0].consent).toEqual('email_notifications');
    expect(events[1].consent).toEqual('email_notifications');
    expect(events[2].consent).toEqual('sms_notifications');
  });

  it('should not create event, reason: no user', async () => {
    const result = await eventService.createEvent({
      userId: '1',
      consents: []
    });

    expect(result).toBeFalsy();
  });

  it('should update existing event', async () => {
    const result = await eventService.createEvent({
      userId: 'd425b368-0cda-409d-b24a-cfa5d8ae59ca',
      consents: [{
        id: 'sms_notifications',
        enabled: false,
      }]
    });
    const records = await eventRepository.find();

    expect(result).toBeTruthy();
    expect(records[2].enabled).toBeFalsy();
  });

  it('should create new event', async () => {
    const result = await eventService.createEvent({
      userId: '9efa3013-f2e4-497e-b910-c6a69767b4e4',
      consents: [{
        id: 'sms_notifications',
        enabled: true,
      }]
    });
    const records = await eventRepository.find();

    expect(result).toBeTruthy();
    expect(records).toHaveLength(4);
    expect(records[3].enabled).toBeTruthy();
  });
});
