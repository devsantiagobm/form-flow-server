import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	findAll() {
		return this.usersRepository.find();
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

		const updatedFields = Object.keys(dto).reduce((acc, key) => {
			acc[key] = dto[key];
			return acc;
		}, {} as Partial<UpdateUserDTO>);

		return updatedFields;
	}

	async delete(id: string) {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) throw new NotFoundException('User not found');

		return this.usersRepository.remove(user);
	}
}
