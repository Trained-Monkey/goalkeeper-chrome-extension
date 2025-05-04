// Utility functions used for comparing and manipulating dates

// Gets the current UTC time accounting for timezones
export function treatAsUTC(date: Date): Date {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

// Gets the number of days between two given days
export function getDaysBetweenDates(start: Date, end: Date): number {
  let millisecondsPerDay = 24 * 60 * 60 * 1000;
  let milliseconds = treatAsUTC(end).getTime() - treatAsUTC(start).getTime();
  return milliseconds / millisecondsPerDay;
}