import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { StrongPassword } from 'src/common/decorators/strong-password.decorator';

export class SignUpDTO {
	@IsString({ message: 'Username is required' })
	@MinLength(3, { message: 'Username most be at least 3 characters long' })
	username: string;

	@IsString({ message: 'Email is required' })
	@IsEmail({}, { message: 'Email must be valid' })
	email: string;

	@IsString({ message: 'Password is required' })
	@StrongPassword()
	password: string;

	@IsString({ message: 'Confirm password is required' })
	@Match('password', { message: 'Passwords do not match' })
	confirmPassword: string;
}
