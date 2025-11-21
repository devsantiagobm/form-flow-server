import { IsEmail, IsOptional, IsString } from 'class-validator';
import { NullToUndefined } from 'src/common/decorators/null-to-undefined.decorator';

export class UpdateUserDTO {
	@IsOptional()
	@NullToUndefined()
	@IsString()
	username?: string;

	@IsOptional()
	@NullToUndefined()
	@IsEmail({}, { message: 'Email must be valid' })
	email?: string;
}
