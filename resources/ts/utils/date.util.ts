import { DateTime } from "luxon";

export default {
  format(date: string) {
    const dateObject = DateTime.fromISO(date);
    return dateObject.toFormat("DD h:m a");
  },
};
