import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class StrongPasswordConstraint implements ValidatorConstraintInterface {
	validate(value: string) {
		if (!value) return false;

		const rules = [
			/[a-z]/.test(value), // lowercase
			/[A-Z]/.test(value), // uppercase
			/[0-9]/.test(value), // number
			/[^A-Za-z0-9]/.test(value), // symbol
			value.length >= 8,
		];

		return rules.every(Boolean);
	}

	defaultMessage(args: ValidationArguments) {
		const value = args.value as string;

		if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
		if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
		if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
		if (!/[^A-Za-z0-9]/.test(value)) return 'Password must contain at least one symbol';
		if (value.length < 8) return 'Password must be at least 8 characters long';

		return 'Password is not strong enough';
	}
}

/**
 * Custom decorator that validates a strong password.
 *
 * Use in DTOs to enforce rules like uppercase, lowercase,
 * number, symbol and minimum length.
 *
 * @param validationOptions Optional class-validator settings.
 */
export function StrongPassword(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: StrongPasswordConstraint,
		});
	};
}
