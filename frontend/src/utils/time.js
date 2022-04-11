import { formatISO9075 } from "date-fns";

export const displayTime = () =>
  formatISO9075(Date.now(), { representation: "time" });

export const formatTime = (date) =>
  formatISO9075(new Date(date), { representation: "time" });
