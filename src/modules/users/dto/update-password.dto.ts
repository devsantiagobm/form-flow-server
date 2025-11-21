import { IsString, MinLength } from 'class-validator';
import { StrongPassword } from 'src/common/decorators/strong-password.decorator';

export class UpdatePasswordDTO {
	@IsString({ message: 'Password is required' })
	@MinLength(8, { message: 'Passowrd must be longer or equal to 8 characters' })
	@StrongPassword()
	password: string;
}
