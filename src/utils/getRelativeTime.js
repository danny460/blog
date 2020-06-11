const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const MS_PER_MONTH = MS_PER_DAY * 30;
const MS_PER_YEAR = MS_PER_DAY * 365;

/**
 * return human friendly relative time from javascript date object
 * @param {number} past the date to convert, in millis
 * @returns {string} relative time
 */
export default function getRelativeTime(past) {
  const elapsed = Date.now() - past;

  if (elapsed < MS_PER_MINUTE) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  } else if (elapsed < MS_PER_HOUR) {
    return `${Math.round(elapsed / MS_PER_MINUTE)} minutes ago`;
  } else if (elapsed < MS_PER_DAY) {
    return `${Math.round(elapsed / MS_PER_HOUR)} hours ago`;
  } else if (elapsed < MS_PER_MONTH) {
    return `about ${Math.round(elapsed / MS_PER_DAY)} days ago`;
  } else if (elapsed < MS_PER_YEAR) {
    return `about ${Math.round(elapsed / MS_PER_MONTH)} months ago`;
  } else {
    return `about ${Math.round(elapsed / MS_PER_YEAR)} years ago`;
  }
}
