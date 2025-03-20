// import { setPatientAlert } from '../../redux/slices/patient_alertSlice';
// import { useDispatch ,useSelector} from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Swal from 'sweetalert2';
dayjs.extend(customParseFormat)



const SOCKET=import.meta.env.VITE_SOCKET



var wss;

export const createWebSocketConnection=async ({userId})=>{ 
    wss=new WebSocket(SOCKET)
    wss.onopen=()=>{
        console.log("connected to websocket")
        wss.send(JSON.stringify({type:"register",clientId:userId}))
    }
    wss.onmessage=(event)=>{
        // console.log("message from backed",event?.data)
        const data=JSON.parse(event?.data)
        // console.log("booking time",data.booking.startTime)
        if(data.type=="meetingReminder"){
            // const timeDiff=dayjs().diff(dayjs(`${data.booking.startTime}`,'H:mm A'),'minutes')
            const timeDiff=dayjs(`${data.booking.startTime}`,'H:mm A').diff(dayjs(),'minutes')
            console.log('diff',timeDiff)
            if(timeDiff<=60 && timeDiff>0 ){
                console.log("i'm here")
                Swal.fire(`Meeting in ${Math.abs(timeDiff)} minutes`,"","warning")
            }
        }
        
    }

}


// const createAlert=async ({booking})=>{
//     const dispatch=useDispatch()
//     console.log("at create alert")

//     try {
//         await dispatch(setPatientAlert({patient_meetingAlert:true}))
        
//     } catch (error) {
//         console.log(error)
//     }
// }
