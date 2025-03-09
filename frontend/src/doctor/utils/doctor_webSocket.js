import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Swal from 'sweetalert2';
dayjs.extend(customParseFormat)
const SOCKET=import.meta.env.VITE_SOCKET


export const doctor_createWebSocketConnection=async ({userId})=>{ 
    const wss=new WebSocket(SOCKET)
        wss.onopen=()=>{
            console.log("connected to websocket")
            wss.send(JSON.stringify({type:"register",clientId:userId}))
        }
        wss.onmessage=(event)=>{
            // console.log("message from backed",event?.data)
            const data=JSON.parse(event?.data)
            // console.log("booking time",data.booking.startTime)
            if(data.type=="meetingReminder"){
                const timeDiff=dayjs().diff(dayjs(`${data.booking.startTime}`,'H:mm A'),'minutes')
                // console.log('diff',timeDiff)
                if(Math.abs(timeDiff)<=60){
                    // console.log("i'm here")
                    Swal.fire(`Meeting in ${Math.abs(timeDiff)} minutes`,"","warning")
                }
            }
            
        }
}