import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


const today=dayjs()

export const slotDates=[]

for(var i=0;i<=5;i++){
    slotDates.push(today.add(i,'day').format(`D MMM, dddd`).toString())
}

