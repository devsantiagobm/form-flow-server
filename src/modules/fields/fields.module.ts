import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { FieldsController } from './fields.controller';
import { FieldsService } from './fields.service';
import { FormsModule } from '../forms/forms.module';

@Module({
	imports: [TypeOrmModule.forFeature([Field]), FormsModule],
	controllers: [FieldsController],
	providers: [FieldsService],
})
export class FieldsModule {}
