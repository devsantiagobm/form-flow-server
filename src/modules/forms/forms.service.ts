import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDTO } from './dto/create-form.dto';
import { UpdateFormDTO } from './dto/update-form.dto';
import { FormStatus } from './enums/form-status';
import { UsersService } from '../users/users.service';

@Injectable()
export class FormsService {
	constructor(
		@InjectRepository(Form)
		private readonly formRepository: Repository<Form>,
		private readonly usersService: UsersService,
	) {}

	findAll() {
		return this.formRepository.find();
	}

	async findById(id: string) {
		const form = await this.formRepository.findOneBy({ id });
		if (!form) throw new NotFoundException(`Form not found`);
		return form;
	}

	async findByOwner(ownerId: string) {
		return this.formRepository.findBy({ ownerId });
	}

	async create(createFormDto: CreateFormDTO) {
		const owner = await this.usersService.findById(createFormDto.ownerId);
		if (!owner) throw new ConflictException('The specified owner does not exist');
		const form = this.formRepository.create(createFormDto);
		return this.formRepository.save(form);
	}

	async update(id: string, updateFormDto: UpdateFormDTO) {
		const form = await this.formRepository.findOneBy({ id });
		if (!form) throw new NotFoundException('Form not found');

		Object.assign(form, updateFormDto);
		await this.formRepository.save(form);

		return updateFormDto;
	}

	async softDelete(id: string) {
		const form = await this.formRepository.findOneBy({ id });
		if (!form) throw new NotFoundException('Form not found');

		form.status = FormStatus.DELETED;
		await this.formRepository.save(form);
	}

	async restore(id: string) {
		const form = await this.formRepository.findOneBy({ id });
		if (!form) throw new NotFoundException('Form not found');

		if (form.status !== FormStatus.DELETED) {
			throw new ConflictException('Form is not deleted and cannot be restored');
		}

		form.status = FormStatus.DRAFT;
		await this.formRepository.save(form);
	}

	async updateStatus(id: string, status: FormStatus) {
		const form = await this.formRepository.findOneBy({ id });
		if (!form) throw new NotFoundException('Form not found');

		form.status = status;
		await this.formRepository.save(form);
	}

	async duplicate(id: string) {
		const form = await this.formRepository.findOneBy({ id });
		if (!form) throw new NotFoundException('Form not found');

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id: _, createdAt, updatedAt, ...copy } = form;

		const newForm = this.formRepository.create(copy);
		return this.formRepository.save(newForm);
	}
}
