export function formatTime(time) {
  const dateObj = new Date(time);
  return dateObj.toLocaleString();
}
