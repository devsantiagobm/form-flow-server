import { IsEmail, IsString } from 'class-validator';
import { StrongPassword } from 'src/common/decorators/strong-password.decorator';

export class LoginDTO {
	@IsString({ message: 'Email is required' })
	@IsEmail({}, { message: 'Email must be valid' })
	email: string;

	@IsString({ message: 'Password is required' })
	@StrongPassword()
	password: string;
}
