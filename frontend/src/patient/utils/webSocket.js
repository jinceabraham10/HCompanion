const SOCKET=import.meta.env.VITE_SOCKET

export const createWebSocketConnection=async ()=>{
    const wss=new WebSocket(SOCKET)
    wss.onopen=()=>{
        console.log("connected to websocket")
        wss.send(JSON.stringify({type:"jkkkjjjjj"}))
    }

}