import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  userId: string;

  @Column("simple-json")
  auditLog: { consent: string, enabled: boolean };

  @CreateDateColumn()
  createdAt: string;
}
