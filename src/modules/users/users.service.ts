import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	findAll() {
		return this.usersRepository.find();
	}

	async findById(id: string) {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) throw new NotFoundException(`user not found`);
		return user;
	}

	create(createUserDto: CreateUserDTO) {
		const user = this.usersRepository.create(createUserDto);
		return this.usersRepository.save(user);
	}

	async update(id: string, dto: UpdateUserDTO) {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) throw new NotFoundException('User not found');

		Object.assign(user, dto);
		await this.usersRepository.save(user);

		return dto;
	}

	async updatePassword(id: string, updatePasswordDto: UpdatePasswordDTO) {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) throw new NotFoundException('User not found');

		user.password = updatePasswordDto.password;

		await this.usersRepository.save(user);
	}

	async delete(id: string) {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) throw new NotFoundException('User not found');

		return this.usersRepository.remove(user);
	}
}
