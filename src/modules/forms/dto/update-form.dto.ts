import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { FormStatus } from '../enums/form-status';
import { NullToUndefined } from 'src/common/decorators/null-to-undefined.decorator';

export class UpdateFormDTO {
	@NullToUndefined()
	@IsString({ message: 'Name is required' })
	@IsOptional()
	name?: string;

	@NullToUndefined()
	@IsString({ message: 'Description must be a valid string' })
	@IsOptional()
	description?: string;

	@NullToUndefined()
	@IsEnum(FormStatus, { message: 'Status must be a valid enum value' })
	@IsOptional()
	status?: string;

	@NullToUndefined()
	@IsDate({ message: 'startDate must be a valid Date' })
	@IsOptional()
	startDate?: Date;

	@NullToUndefined()
	@IsDate({ message: 'endDate must be a valid Date' })
	@IsOptional()
	endDate?: Date;

	@NullToUndefined()
	@IsBoolean({ message: 'enableNotifications must be a valid boolean value' })
	@IsOptional()
	enableNotifications?: boolean;
}
