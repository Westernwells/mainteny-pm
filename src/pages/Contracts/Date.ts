import {
  add,
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  sub,
} from 'date-fns';

export const upcommingDates: {[key: string]: any} = {
  LAST_WEEK: {
    start: startOfWeek(sub(new Date(), {weeks: 1})),
    end: endOfWeek(sub(new Date(), {weeks: 1})),
  },
  TODAY: {start: startOfDay(new Date()), end: endOfDay(new Date())},
  THIS_WEEK: {start: startOfWeek(new Date()), end: endOfWeek(new Date())},
  NEXT_WEEK: {
    start: startOfWeek(add(new Date(), {days: 7})),
    end: endOfWeek(add(new Date(), {days: 7})),
  },
  THIS_MONTH: {
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
};
