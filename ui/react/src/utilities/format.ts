import dayjs from 'dayjs';

const getPlural = (value: number) => (value > 1 ? 's' : '');

export const formatDateTime = (dateTimeString: string) => {
  const now = dayjs();
  const createdAt = dayjs(dateTimeString);
  const diffDates = now.diff(createdAt, 'days');
  if (diffDates >= 7) {
    const diffWeeks = Math.floor(diffDates / 7);
    return `${diffWeeks} week${getPlural(diffWeeks)} ago`;
  }
  if (diffDates > 0) {
    return `${diffDates} day${getPlural(diffDates)} ago`;
  }
  const diffHours = now.diff(createdAt, 'hours');
  if (diffHours > 0) {
    return `${diffHours} hour${getPlural(diffHours)} ago`;
  }
  const diffMinutes = now.diff(createdAt, 'minutes');
  if (diffMinutes > 0) {
    return `${diffMinutes} minute${getPlural(diffMinutes)} ago`;
  }
  const diffSeconds = now.diff(createdAt, 'seconds');
  if (diffSeconds > 0) {
    return `${diffSeconds} second${getPlural(diffSeconds)} ago`;
  }
  return 'Now';
};
