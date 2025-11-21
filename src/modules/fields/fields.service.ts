import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';
import { FormsService } from '../forms/forms.service';

@Injectable()
export class FieldsService {
	constructor(
		@InjectRepository(Field) private readonly fieldRepository: Repository<Field>,
		protected readonly formsService: FormsService,
	) {}

	async getFieldsByFormId(id: string) {
		await this.formsService.findById(id);
		return await this.fieldRepository.find({ where: { formId: id }, order: { order: 'ASC' } });
	}
}
