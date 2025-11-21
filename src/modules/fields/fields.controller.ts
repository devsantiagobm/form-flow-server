import { Controller, Get, Param } from '@nestjs/common';
import { FieldsService } from './fields.service';

@Controller('fields')
export class FieldsController {
	constructor(private readonly fieldsService: FieldsService) {}

	@Get(':id')
	getAllByFormId(@Param('id') formId: string) {
		return this.fieldsService.getFieldsByFormId(formId);
	}
}
