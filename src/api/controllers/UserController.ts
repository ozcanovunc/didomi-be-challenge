import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserModel } from '../models/UserModel';
import { Response } from 'express';

@Controller('/users')
export class UserController {
	constructor(
		private readonly userService: UserService
	) { }

	@Get()
	getAllUsers(): Promise<UserModel[]> {
		return this.userService.getAllUsers();
	}

	@Post()
	async createUser(
		@Body() user: UserModel,
		@Res() response: Response
	): Promise<void> {
		const userAdded = await this.userService.createUser(user);
		response
			.status(userAdded ? HttpStatus.OK : HttpStatus.UNPROCESSABLE_ENTITY)
			.send(userAdded);
	}

	@Get(':id')
	async getUser(
		@Param('id') id,
		@Res() response: Response
	): Promise<void> {
		const user = await this.userService.getUser(id);
		response
			.status(user ? HttpStatus.OK : HttpStatus.NOT_FOUND)
			.send(user);
	}

	@Put(':id')
	async updateUser(
		@Param('id') id,
		@Res() response: Response,
		@Body() user: UserModel
	): Promise<void> {
		const updated = await this.userService.updateUser(id, user);
		response
			.status(updated ? HttpStatus.OK : HttpStatus.NOT_FOUND)
			.send();
	}

	@Delete(':id')
	async deleteUser(
		@Param('id') id,
		@Res() response: Response
	): Promise<void> {
		const deleted = await this.userService.deleteUser(id);
		response
			.status(deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND)
			.send();
	}
}
