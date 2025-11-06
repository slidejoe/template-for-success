import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';
import { DateTime } from 'luxon';
// import { DateTime } from '@umbraco-cms/backoffice/external/luxon';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
	filter(value?: Date | string | { date: string, timeZone: string | undefined | null } | undefined | null, format?: string) {
		if (!value) return value;

		const date = value instanceof Date ? DateTime.fromJSDate(value) : typeof value === 'string' ? DateTime.fromISO(value) : DateTime.fromISO(value.date, { zone: value.timeZone || undefined });

		if (date.invalidReason) {
			console.error(`Invalid date passed to dateFormat filter: ${date.invalidReason}\r\n${date.invalidExplanation}`);
			return '';
		}

		// Allowed formats: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return date.toFormat(format || "yyyy-MM-dd HH:mm");
	}
}

export { UmbUfmDateFormatFilterApi as api };