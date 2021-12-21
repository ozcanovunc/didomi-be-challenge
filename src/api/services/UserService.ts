import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { consentMapper } from '../../lib/mappers/consent';
import { Repository } from 'typeorm';
import { EventModel } from '../models/EventModel';
import { UserModel } from '../models/UserModel';
import { isEmail } from 'validator';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(EventModel)
    private eventRepository: Repository<EventModel>,
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) { }

  getAllUsers(): Promise<UserModel[]> {
    this.logger.log('getAllUsers');
    return this.usersRepository.find();
  }

  async getUser(id: string): Promise<any> {
    const events = await this.eventRepository.find({ userId: id });
    const user = await this.usersRepository.findOne(id);
    const userWithConsents = {
      ...user,
      consents: events.map(consentMapper)
    };
    this.logger.log('getUser', userWithConsents);
    return userWithConsents;
  }

  async createUser(user: UserModel): Promise<any> {
    const userAlreadyExists = await this.usersRepository.findOne({ email: user.email });
    if (userAlreadyExists) {
      this.logger.error(`Create user failed, user already exists ${user.email}`);
      return;
    }
    if (!isEmail(user.email)) {
      this.logger.error(`Create user failed, mail is not valid ${user.email}`);
      return;
    }
    const result = await this.usersRepository.insert(user);
    const userId = result.identifiers[0].id;
    return this.getUser(userId);
  }

  async updateUser(id: string, user: UserModel): Promise<boolean> {
    const oldUser = await this.usersRepository.findOne(id);
    if (!oldUser) {
      this.logger.error(`Update user failed, user doesnt exist ${id}`);
      return false;
    }
    await this.usersRepository.update(id, user);
    this.logger.log(`Update user succeeded ${id}`);
    return true;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    const deleted = result.affected !== 0;
    deleted ?
      this.logger.log(`Delete user succeeded ${id}`) :
      this.logger.error(`Delete user failed ${id}`)
    return deleted;
  }
}
