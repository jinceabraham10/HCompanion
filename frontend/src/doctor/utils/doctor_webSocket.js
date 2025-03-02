const SOCKET=import.meta.env.VITE_SOCKET


export const doctor_createWebSocketConnection=async ({userId})=>{ 
    const wss=new WebSocket(SOCKET)
    wss.onopen=()=>{
        console.log("connected to websocket")
        wss.send(JSON.stringify({type:"register",clientId:userId}))
    }

}