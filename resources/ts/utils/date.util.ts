import { DateTime } from "luxon";

export default {
  humanize(date: string) {
    const dateObject = DateTime.fromISO(date);
    return dateObject.toFormat("DD h:m a");
  },
};
