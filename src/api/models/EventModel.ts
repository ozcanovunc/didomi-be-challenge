import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum Consent {
  EMAIL = 'email_notifications',
  SMS = 'sms_notifications',
}

@Entity()
export class EventModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  userId: string;

  @Column('text')
  consent: Consent;

  @Column({ default: false })
  enabled: boolean;
}
