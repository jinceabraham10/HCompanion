const SOCKET=import.meta.env.VITE_SOCKET

var wss;

export const createWebSocketConnection=async ({userId})=>{ 
    wss=new WebSocket(SOCKET)
    wss.onopen=()=>{
        console.log("connected to websocket")
        wss.send(JSON.stringify({type:"register",clientId:userId}))
    }
    wss.onmessage=(event)=>{
        console.log("message from backed",event.data)
    }

}

export const patient_alertMeeting=async ()=>{
    try {
        wss.onmessage=(event)=>{
            console.log(event.data)
        }
        
    } catch (error) {
        console.log(error)
    }
}