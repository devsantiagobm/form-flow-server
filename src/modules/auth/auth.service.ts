import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login(loginDto: LoginDTO) {
		const user = await this.usersService.findByEmail(loginDto.email, {
			select: ['id', 'username', 'password'],
		});

		if (!user) throw new UnauthorizedException('Invalid credentials');

		const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
		if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials');

		const payload = { sub: user.id, username: user.username };
		return await this.jwtService.signAsync(payload);
	}

	async signUp(signUpDto: SignUpDTO) {
		const { email, password, username } = signUpDto;
		const hashedPassword = await bcrypt.hash(password, 10);

		const createUserDto: CreateUserDTO = { email, password: hashedPassword, username };
		const user = await this.usersService.create(createUserDto);

		const payload = { sub: user.id, username: user.username };
		return await this.jwtService.signAsync(payload);
	}
}
