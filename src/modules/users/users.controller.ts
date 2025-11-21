import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findById(@Param('id') id: string) {
		return this.usersService.getById(id);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDTO) {
		return this.usersService.create(createUserDto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
		return this.usersService.update(id, updateUserDto);
	}

	@Patch(':id/password')
	updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDTO) {
		return this.usersService.updatePassword(id, updatePasswordDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.usersService.delete(id);
	}
}
