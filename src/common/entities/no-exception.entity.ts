import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('NoException')
export class NoExceptionEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  code: number;

  @Column({ default: new Date() })
  timestamp: Date;

  @Column()
  message: string;

  @Column({ default: null, nullable: true })
  entity: string;

  @Column()
  success: boolean;

  @Column()
  host: string;

  @Column()
  ip: string;

  @Column()
  path: string;

  @Column()
  cookies: string;

  @Column()
  userAgent: string;

  @Column()
  params: string;

  @Column()
  method: string;

  @Column()
  body: string;
}
