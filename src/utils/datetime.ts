import {format, parseISO} from 'date-fns';

function getDateObject(input: any): Date {
  const type = typeof input;
  if (type === 'string') {
    return parseISO(input);
  }

  if (type === 'number') {
    return new Date(input);
  }

  return <Date>input;
}

export function getDay(input?: String | Date) {
  if (!input) {
    return undefined;
  }
  return format(getDateObject(input), 'yyyy-MM-dd');
}
