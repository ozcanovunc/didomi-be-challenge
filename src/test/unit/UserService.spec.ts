import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserModel } from "../../api/models/UserModel";
import { UserService } from "../../api/services/UserService";
import { Repository } from "typeorm";
import { UserRepositoryFake } from "./fake/UserRepositoryFake";
import { EventModel } from "../../api/models/EventModel";
import { EventRepositoryFake } from "./fake/EventRepositoryFake";

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<UserModel>;
  let eventRepository: Repository<EventModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    userService = module.get(UserService);
    usersRepository = module.get(getRepositoryToken(UserModel));
    eventRepository = module.get(getRepositoryToken(EventModel));
  });

  it('should return all users', async () => {
    const allUsers = await userService.getAllUsers();

    expect(allUsers).toHaveLength(2);
    expect(allUsers[0].email).toEqual('ozcan@gmail.com');
    expect(allUsers[1].email).toEqual('ozcan2@gmail.com');
  });

  it('should not update user, reason: user doesnt exist', async () => {
    const result = await userService.updateUser('1', {
      id: 1,
      email: 'foo@bar.com'
    });

    expect(result).toBeFalsy();
  });

  it('should update user', async () => {
    const result = await userService.updateUser('d425b368-0cda-409d-b24a-cfa5d8ae59ca', {
      id: 1,
      email: 'foo@bar.com'
    });

    expect(result).toBeTruthy();
  });

  it('should get user', async () => {
    const userId = 'd425b368-0cda-409d-b24a-cfa5d8ae59ca';
    const user = await userService.getUser(userId);

    expect(user.id).toEqual(userId);
    expect(user.consents).toHaveLength(2);
  });

  it('should create user', async () => {
    const email = 'ozcan.ovunc@gmail.com';
    const user = await userService.createUser({
      email,
      id: 1
    });

    expect(user).not.toBeUndefined();
    expect(user.email).toEqual(email);
    expect(user.consents).toHaveLength(0);
  });

  it('should fail creating user, reason: already existing user', async () => {
    const user = await userService.createUser({
      email: 'ozcan@gmail.com',
      id: 1
    });

    expect(user).toBeUndefined();
  });

  it('should fail creating user, reason: invalid email', async () => {
    const user = await userService.createUser({
      email: 'invalid.com',
      id: 1
    });

    expect(user).toBeUndefined();
  });

  it('should delete user', async () => {
    const result = await userService.deleteUser('d425b368-0cda-409d-b24a-cfa5d8ae59ca');

    expect(result).toBeTruthy();
  });

  it('should not delete user, reason: no user with that id', async () => {
    const result = await userService.deleteUser('1');

    expect(result).toBeFalsy();
  });
});
