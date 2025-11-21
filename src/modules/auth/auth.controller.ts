import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signUp.dto';
import type { CookieOptions, Response } from 'express';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private readonly jwtCookiesOptions: CookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'none',
		maxAge: 24 * 60 * 60 * 1000,
	};

	@Public()
	@Post('login')
	async login(@Body() loginDto: LoginDTO, @Res({ passthrough: true }) res: Response) {
		const token = await this.authService.login(loginDto);

		res.cookie('jwt', token, this.jwtCookiesOptions);
		res.status(201).send();
	}

	@Public()
	@Post('signup')
	async signup(@Body() signUpDto: SignUpDTO, @Res({ passthrough: true }) res: Response) {
		const token = await this.authService.signUp(signUpDto);

		res.cookie('jwt', token, this.jwtCookiesOptions);
		res.status(201).send();
	}
}
