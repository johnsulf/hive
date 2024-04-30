/**
 * Takes a date time string in this format: "2024-04-30T05:34:49.893Z" and returns a formatted date time string in this format: "30.04.2024 05:34"
 * @param {string} dateTimeString For example "2024-04-30T05:34:49.893Z"
 * @returns {string} For example "30.04.2024 05:34"
 * ```js
 * const dateTimeString = "2024-04-30T05:34:49.893Z";
 * const formattedDateTime = formatDateTime(dateTimeString);
 * console.log(formattedDateTime); // "30.04.2024 05:34"
 * ```
 */

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return date.toLocaleDateString('no-NO', options);
}