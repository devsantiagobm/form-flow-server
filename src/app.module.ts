import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './modules/forms/forms.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'password',
			database: 'form_flow',
			synchronize: true,
			autoLoadEntities: true,
		}),
		UsersModule,
		FormsModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
