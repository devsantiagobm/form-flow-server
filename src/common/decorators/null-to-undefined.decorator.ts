import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

/**
 * Converts incoming `null` values to `undefined`
 *
 * Used in DTOs to prevent `null` from being persisted or validated incorrectly.
 * TypeORM treat `undefined` as “do not update this field”, while `null`
 * attempts to write a NULL value, which can cause errors
 */
export function NullToUndefined() {
	return applyDecorators(
		Transform(({ value }: { value: unknown }) => (value === null ? undefined : value)),
	);
}
