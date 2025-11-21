import { Form } from 'src/modules/forms/entities/form.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FieldType } from '../enums/field-types.enum';
import { FieldOption } from '../interfaces/field-option';
import { FieldDefaultValue } from '../interfaces/field-default-value';

@Entity()
export class Field {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	formId: string;

	@ManyToOne(() => Form, { nullable: false })
	@JoinColumn({ name: 'formId' })
	form: Form;

	@Column({ nullable: true })
	question?: string;

	@Column({ type: 'enum', enum: FieldType })
	type: FieldType;

	@Column({ type: 'boolean', default: false })
	required: boolean;

	@Column({ type: 'int', default: 0 })
	order: number;

	@Column({ type: 'json', nullable: true })
	options: FieldOption[] | null;

	@Column({ nullable: true })
	placeholder?: string;

	@Column({ nullable: true })
	helperText?: string;

	/**
	 * Default value(s) for the field.
	 * - Must always be an array even for a single value.
	 * - Stored as JSON to support multi-type and multi-value fields.
	 */
	@Column({ type: 'json', nullable: true })
	defaultValue: FieldDefaultValue | null;
}
