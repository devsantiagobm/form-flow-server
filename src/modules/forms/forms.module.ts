import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { UsersModule } from '../users/users.module';

@Module({
	controllers: [FormsController],
	providers: [FormsService],
	imports: [TypeOrmModule.forFeature([Form]), UsersModule],
	exports: [FormsService],
})
export class FormsModule {}
