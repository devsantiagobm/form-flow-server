/**
 * Represents the default value(s) for a form field.
 *
 * - `string[]`    : Multiple or single values wrapped in an array, used for multi-select
 *                   or single-select fields. Even a single default value must be in an array.
 * - `number[]`    : Numeric default value(s) as an array.
 * - `boolean[]`   : Boolean default value(s) as an array.
 * - `null`        : No default value.
 *
 * Note: Always stored as JSON in the database. This ensures consistency and avoids
 * SQL errors when inserting single or multiple default values.
 */
export type FieldDefaultValue = string[] | number[] | boolean[] | null;
