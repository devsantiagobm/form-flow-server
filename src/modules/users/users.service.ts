import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FindOneOptions, Repository } from 'typeorm';
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

	/**
	 * Finds a user by id without throwing an error.
	 * Returns the user or null. Used in flows where a missing user is valid (e.g. for a wrong search).
	 */
	async findById(id: string) {
		return await this.usersRepository.findOneBy({ id });
	}

	/**
	 * Retrieves a user by id and throws if not found.
	 * Used when the user must exist (e.g. profile access).
	 */
	async getById(id: string) {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) throw new NotFoundException(`user not found`);
		return user;
	}

	async create(createUserDto: CreateUserDTO) {
		const existsByEmail = await this.usersRepository.findOneBy({ email: createUserDto.email });
		if (existsByEmail) throw new ConflictException('Email already registered');

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

	/**
	 * Finds a user by email without throwing an error.
	 * Returns the user or null. Used in flows where a missing user is valid (e.g. login).
	 */
	async findByEmail(email: string, options?: Omit<FindOneOptions<User>, 'where'>) {
		return this.usersRepository.findOne({ ...options, where: { email } });
	}

	/**
	 * Retrieves a user by email and throws if not found.
	 * Used when the user must exist (e.g. profile access).
	 */
	async getByEmail(email: string) {
		const user = await this.usersRepository.findOne({ where: { email } });
		if (!user) throw new NotFoundException('User with this email was not found');

		return user;
	}
}
