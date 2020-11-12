/**
 * return false when given date is invalid date else return true.
 * @param date Date date will be checked.
 * @return { Boolean }
 */
export const isValidDate = (date: Date) => {
  return !isNaN(date.getDate());
};

/**
 * convert string in date format, timestamp to timestamp.
 * @param dateOrTimestamp
 */
export const toTimestamp = (dateOrTimestamp: string | number): number => {
  const d = new Date(dateOrTimestamp);
  if (isValidDate(d)) {
    return d.getTime();
  }
  return 0;
};

/**
 * debounce function.
 * @param wait
 * @param fn
 * @param immediate
 * @private
 */
export const _debounce = (wait: number, fn: (...params: any[]) => any, immediate = false) => {
  let timer: number;
  return function (this: any, ...args: any[]) {
    if (timer === undefined && immediate) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
    return timer;
  };
};
