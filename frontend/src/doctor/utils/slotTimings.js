import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


const today=dayjs()

export const slotTimings=['9 am','11 am','1 pm','3 pm','5 pm','7 pm']

