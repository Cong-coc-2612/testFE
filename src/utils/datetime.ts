import * as dateFns from 'date-fns';

export function formatDateToString(date: Date | null, formatOutput = 'yyyyMMdd') {
  if (date == null) {
    return null;
  }
  return dateFns.format(date, formatOutput);
}

export function formatTimeToDisplay(
  stringInput?: string,
  formatOutput = 'HH:mm:ss',
  formatInput = 'yyyyMMddHHmmss',
  ignoreTimeZone?: boolean
) {
  try {
    if (!stringInput) {
      return null;
    }
    let time = dateFns.parse(stringInput, formatInput, new Date());
    if (ignoreTimeZone !== true) {
      time = dateFns.addHours(time, 7);
    }
    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
}

export function formatDateToDisplay(stringInput?: string, formatOutput = 'dd/MM/yyyy', formatInput = 'yyyyMMdd') {
  try {
    if (!stringInput) {
      return '';
    }
    let time = dateFns.parse(stringInput, formatInput, new Date());
    // time = dateFns.addHours(time, 7);
    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
}

export function formatStringToDate(stringInput: string | undefined, formatInput = 'yyyyMMdd') {
  if (stringInput == null) {
    return new Date();
  }

  return dateFns.parse(stringInput, formatInput, new Date());
}

export function addDays(date: Date, day: number) {
  return dateFns.addDays(date, day);
}
