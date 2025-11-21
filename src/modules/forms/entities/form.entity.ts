import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { FormStatus } from '../enums/form-status';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Form {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	ownerId: string;

	@ManyToOne(() => User, { nullable: false })
	@JoinColumn({ name: 'ownerId' })
	owner: User;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column({ type: 'enum', enum: FormStatus, default: FormStatus.DRAFT })
	status: FormStatus;

	@Column({ nullable: true, type: 'date' })
	startDate?: Date;

	@Column({ nullable: true, type: 'date' })
	endDate?: Date;

	@Column({ default: false })
	enableNotifications: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
