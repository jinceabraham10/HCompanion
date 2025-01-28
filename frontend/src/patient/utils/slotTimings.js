import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


const today=dayjs()

export const slotTimings=['9:00 AM','11:00 AM','1:00 PM','3:00 PM','5:00 PM','7:00 PM']

