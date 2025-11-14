import { IsEmail, IsOptional, NotEquals, ValidateIf } from 'class-validator';

export class UpdateUserDTO {
	@IsOptional()
	name?: string;

	@IsEmail({}, { message: 'Email must be valid' })
	@IsOptional()
	email?: string;
}
