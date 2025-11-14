import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {

	@IsString({ message: 'Name is required' })
	name: string;

	@IsEmail({}, {message: "Email must be valid"})
	@IsString({ message: "Email is required" })
	email: string;

	@IsString({ message: 'Password is required' })
	@MinLength(8, {message: "Passowrd must be longer or equal to 8 characters"})
	password: string;
}
