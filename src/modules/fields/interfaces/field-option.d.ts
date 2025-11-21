export interface FieldOption {
	/** Visible label for display */
	label: string;

	/** Value submitted when selected */
	value: string;

	/** Optional short description */
	description?: string;

	/** Optional icon identifier */
	icon?: string;

	/** Optional image URL */
	image?: string;

	/** Whether the option is disabled */
	disabled?: boolean;

	/** Extra metadata for future flexibility */
	meta?: Record<string, any>;
}
