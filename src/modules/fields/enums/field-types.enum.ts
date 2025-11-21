/**
 * Defines all supported field types that can be used inside a form.
 *
 * Each field type determines how the field is rendered on the frontend
 * and what kind of response is expected from the user.
 */
export enum FieldType {
	/** Single-line text input. */
	TEXT = 'text',

	/** Multi-line text input, used for long answers. */
	TEXTAREA = 'textarea',

	/** Numeric input field, supports min/max validation. */
	NUMBER = 'number',

	/** Email-specific input  */
	EMAIL = 'email',

	/** Phone number input */
	PHONE = 'phone',

	/** Date picker field */
	DATE = 'date',

	/**
	 * Dropdown list where the user selects exactly one option.
	 * Example: choosing a country or a category.
	 */
	SELECT = 'select',

	/**
	 * Dropdown or list allowing the user to pick multiple options.
	 * Example: selecting several skills.
	 */
	MULTI_SELECT = 'multi_select',

	/**
	 * Single-choice field rendered as multiple radio buttons.
	 *
	 * Difference vs SELECT:
	 * - SELECT is compact (hidden options).
	 * - RADIO shows all options visibly, useful when having few options.
	 */
	RADIO = 'radio',

	/**
	 * One or more independent boolean choices.
	 * Example: “I accept the terms”, “Subscribe to newsletter”.
	 */
	CHECKBOX = 'checkbox',

	/** File upload field (PDF, images, documents). */
	FILE = 'file',

	/**
	 * Rating input, often rendered as stars or a numeric scale.
	 * Example: 1–5 rating.
	 */
	RATING = 'rating',

	/** Binary Yes/No choice. A simplified version of RADIO. */
	YES_NO = 'yes_no',

	/**
	 * Non-interactive text block used for titles, descriptions,
	 * or instructions inside the form.
	 */
	STATEMENT = 'statement',
}
