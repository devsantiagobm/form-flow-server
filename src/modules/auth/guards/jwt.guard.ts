import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
	constructor(
		protected readonly jwtService: JwtService,
		protected readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
				context.getHandler(),
				context.getClass(),
			]);

			if (isPublic) return true;

			const request: Request = context.switchToHttp().getRequest();
			const token = this.extractTokenFromHeader(request);

			if (!token) throw new UnauthorizedException();

			await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

			return true;
		} catch {
			throw new UnauthorizedException();
		}
	}

	extractTokenFromHeader(request: Request) {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
