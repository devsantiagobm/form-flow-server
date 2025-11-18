import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDTO } from './dto/create-form.dto';
import { UpdateFormDTO } from './dto/update-form.dto';
import { FormStatus } from './enums/form-status';

@Controller('forms')
export class FormsController {
	constructor(private readonly formService: FormsService) {}

	@Get()
	findAll() {
		return this.formService.findAll();
	}

	@Get(':id')
	findById(@Param('id') id: string) {
		return this.formService.findById(id);
	}

	@Post()
	create(@Body() createFormDto: CreateFormDTO) {
		return this.formService.create(createFormDto);
	}

	@Post(':id/duplicate')
	duplicate(@Param('id') id: string) {
		return this.formService.duplicate(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDTO) {
		return this.formService.update(id, updateFormDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.formService.softDelete(id);
	}

	@Get('/owner/:id')
	findByOwner(@Param(':id') ownerId: string) {
		return this.formService.findByOwner(ownerId);
	}

	@Patch(':id/publish')
	publish(@Param('id') id: string) {
		return this.formService.updateStatus(id, FormStatus.PUBLISHED);
	}

	@Patch(':id/archive')
	archive(@Param('id') id: string) {
		return this.formService.updateStatus(id, FormStatus.ARCHIVED);
	}

	@Patch(':id/restore')
	restore(@Param('id') id: string) {
		return this.formService.restore(id);
	}
}
