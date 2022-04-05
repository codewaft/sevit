import { DateTime } from "luxon";

export default {
  humanize(date: string | null) {
    if (date === null) return null;
    const dateObject = DateTime.fromISO(date);
    return dateObject.toFormat("DD h:m a");
  },

  utc(date: string): string {
    const dateObject = DateTime.fromISO(date);
    const utc = dateObject.toUTC().toISO();
    return utc || "";
  },

  local(date: string): string {
    const dateObject = DateTime.fromISO(date);
    const local = dateObject.toLocal().toISO({ includeOffset: false });
    return local || "";
  },
};
