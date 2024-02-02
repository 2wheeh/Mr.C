import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);

export type Locale = 'ko-KR' | 'en-US';

// If this function is called on server, it would reflect
// the timezone where the server at rather than the client at.
// This could cause a react hydration error.
export function formatDateToLocal(dateStr: string, locale: Locale, relative = false) {
  const date = new Date(dateStr);

  if (relative) {
    return dayjs(date).locale(locale).fromNow();
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(date);
}
