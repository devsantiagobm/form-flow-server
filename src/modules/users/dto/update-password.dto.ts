import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
	@IsString({ message: 'Password is required' })
	@MinLength(8, { message: 'Passowrd must be longer or equal to 8 characters' })
	password: string;
}
