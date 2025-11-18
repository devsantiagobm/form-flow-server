import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { FormStatus } from '../enums/form-status';

export class CreateFormDTO {
	@IsString({ message: 'ownerId is required' })
	ownerId: string;

	@IsString({ message: 'Name is required' })
	name: string;

	@IsOptional()
	@IsString({ message: 'Description must be a valid string' })
	description?: string;

	@IsEnum(FormStatus, { message: 'Status must be a valid enum value' })
	status: FormStatus;

	@IsOptional()
	@IsDate({ message: 'startDate must be a valid Date' })
	startDate: Date;

	@IsOptional()
	@IsDate({ message: 'endDate must be a valid Date' })
	endDate: Date;

	@IsOptional()
	@IsBoolean({ message: 'enableNotifications must be a valid boolean value' })
	enableNotifications: boolean;
}
