import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	email: string;
}
