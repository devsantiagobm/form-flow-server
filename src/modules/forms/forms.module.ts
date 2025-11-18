import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';

@Module({
	controllers: [FormsController],
	providers: [FormsService],
	imports: [TypeOrmModule.forFeature([Form])],
})
export class FormsModule {}
