<p align="center">
  <a href="https://didomi.io/" target="blank"><img src="https://avatars.githubusercontent.com/u/29689963?s=200&v=4" width="100"/></a>
</p>

<p align="center">Backend engineering challenge for Didomi</p>

## Description

- Includes he solution of backend engineering [challenge](https://github.com/didomi/challenges/tree/master/backend) for Didomi 🚀
- [NestJS](https://nestjs.com/) is used as core framework 🐱

## Development Setup

- Make sure [Node.js](https://nodejs.org/about/releases/) is installed
- Make sure you have created a `.env` file at the root and all the necessary variables are in place
(Please refer `.env-example`)
- Run `npm install` in the root of the project
- For development, run `npm run start:dev` which also enables watcher
- The app is available in `http://localhost:3000/` 🏃

## Using Docker

- Dockerfile is also in place for deployment
- Running the following commands will build & run the app
```
docker build -t app .
docker run -p 3000:3000 app
```
## Test

- Tests will be performed by Jest
```
npm run test
```

## API Catalog

> Users

| Method | Route | Description |
| :--- | :---: | ---: |
| GET | `/users` | Retrieve all users |
| POST | `/users` | Create user |
| GET | `/users/:id` | Get user by id |
| PUT | `/users/:id` | Update user by id |
| DELETE | `/users/:id` | Delete user by id |

> Events

| Method | Route | Description |
| :--- | :---: | ---: |
| GET | `/events` | Retrieve all events |
| POST | `/events` | Create event |

> Audit

| Method | Route | Description |
| :--- | :---: | ---: |
| GET | `/audit/:userId` | Get audit by user id |

> Health

| Method | Route | Description |
| :--- | :---: | ---: |
| GET | `/health` | Check health status |

## Coverage

File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   89.83 |      100 |   76.47 |   90.38 |                   
 models            |     100 |      100 |     100 |     100 |                   
  AuditModel.ts    |     100 |      100 |     100 |     100 |                   
  EventModel.ts    |     100 |      100 |     100 |     100 |                   
  UserModel.ts     |     100 |      100 |     100 |     100 |                   
 services          |   87.09 |      100 |      75 |   88.23 |                   
  AuditService.ts  |   78.57 |      100 |   66.66 |      75 | 22-24             
  EventService.ts  |     100 |      100 |     100 |     100 |                   
  HealthService.ts |       0 |      100 |       0 |       0 | 1-13              
  UserService.ts   |     100 |      100 |     100 |     100 |            