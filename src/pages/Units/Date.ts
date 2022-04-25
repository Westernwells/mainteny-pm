import {add, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';

export const upcommingDates: {[key: string]: any} = {
  THIS_WEEK: {start: startOfWeek(new Date()), end: endOfWeek(new Date())},
  NEXT_WEEK: {
    start: startOfWeek(add(new Date(), {days: 7})),
    end: endOfWeek(add(new Date(), {days: 7})),
  },
  THIS_MONTH: {
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
  NEXT_MONTH: {
    start: startOfMonth(add(new Date(), {months: 1})),
    end: endOfMonth(add(new Date(), {months: 1})),
  },
};
