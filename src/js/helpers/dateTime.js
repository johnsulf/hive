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