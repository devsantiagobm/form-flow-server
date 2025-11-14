import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		UsersModule,
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
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
