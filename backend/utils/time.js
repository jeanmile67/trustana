import { formatISO9075 } from 'date-fns';

export const displayTime = () => formatISO9075(Date.now(), { representation: 'time' });
