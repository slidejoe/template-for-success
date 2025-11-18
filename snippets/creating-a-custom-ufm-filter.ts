// #region snippet-1
export const manifests: Array<UmbExtensionManifest> = [
  //TODO: Add your extension manifests here
];
// #endregion snippet-1

// #region snippet-2
export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'ufmFilter',
    alias: 'My.UfmFilter.DateFormat',
    name: 'Date Format UFM Filter',
    api: () => import('./date-format.filter'),
    meta: {
      alias: 'dateFormat'
    }
  }
];
// #endregion snippet-2

// #region snippet-3
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value) {
    // TODO: Manipulate the value here
    return value;
  }
}
export { UmbUfmDateFormatFilterApi as api };
// #endregion snippet-3

// #region snippet-4
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value, format) {
    // TODO: Manipulate the value here
    return value;
  }
}
export { UmbUfmDateFormatFilterApi as api };
// #endregion snippet-4

// #region snippet-5
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';
import { DateTime } from 'luxon';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value, format) {
    if (!value) return value;

    const date = DateTime.fromISO(value.date, { zone: value.timeZone });

    return date.toFormat(format || "yyyy-MM-dd HH:mm");
  }
}
export { UmbUfmDateFormatFilterApi as api };
// #endregion snippet-5

// #region snippet-6
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';
import { DateTime } from 'luxon';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value, format) {
    if (!value) return value;

    const date = value instanceof Date ?
      DateTime.fromJSDate(value) :
      typeof value === 'string' ?
        DateTime.fromISO(value) :
        DateTime.fromISO(value.date, { zone: value.timeZone || undefined });

    return date.toFormat(format || "yyyy-MM-dd HH:mm");
  }
}
export { UmbUfmDateFormatFilterApi as api };
// #endregion snippet-6

// #region snippet-7
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';
import { DateTime } from 'luxon';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value?: Date | string | { date: string, timeZone: string | undefined | null } | undefined | null, format?: string) {
    if (!value) return value;

    const date = value instanceof Date ?
      DateTime.fromJSDate(value) :
      typeof value === 'string' ?
        DateTime.fromISO(value) :
        DateTime.fromISO(value.date, { zone: value.timeZone || undefined });

    if (date.invalidReason) {
      console.error(`Invalid date passed to dateFormat filter: ${date.invalidReason}\r\n${date.invalidExplanation}`);
      return '';
    }

    // Allowed formats: https:// moment.github.io/luxon/#/formatting?id=table-of-tokens
    return date.toFormat(format || "yyyy-MM-dd HH:mm");
  }
}
export { UmbUfmDateFormatFilterApi as api };
// #endregion snippet-7
