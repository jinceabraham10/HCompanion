import React, { useEffect, useState } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
  LocalUser,
  RemoteUser,
  useJoin,
  useIsConnected,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useSearchParams } from "react-router-dom";
import { IoMdCall, IoMdVolumeMute } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

function AgoraVideoConsult() {

  const params=new URLSearchParams(location.search)
  const doctorId=params.get('doctorId')
  const patientId=params.get('patientId')

  return (
    <div className="w-screen h-screen flex flex-col gap-2">
      <h1 className="w-full h-auto bg-blue-500 p-2 text-lg font-medium flex justify-center shadow-lg">
        Consultation
      </h1>
      <div className="flex flex-1 w-full p-2">
        <AgoraRTCProvider client={client}>
          <div className="w-full h-[80vh]">
            <ConsultationLiveVideo doctorId={doctorId} patientId={patientId}/>
          </div>
        </AgoraRTCProvider>
      </div>
    </div>
  );
}

function ConsultationLiveVideo(props) {
  const AGORA_APP_ID = import.meta.env.VITE_AGORA_APP_ID;
  const isConnected = useIsConnected();
  const [calling,setCalling]=useState(true)
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

 const {doctorId,patientId}=props

  useJoin({ appid: AGORA_APP_ID, channel: `consulation_${doctorId}_${patientId}`,token: null }, calling);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  
  useEffect(()=>{

    client.on('user-joined',(user)=>{
      console.log('userrr',user)
    })

    client.on('user-published',(user,mediaType)=>{
      console.log('user published',user.uid,mediaType)
    })

  },[])

  // console.log('local Camera',localCameraTrack)

  const remoteUsers = useRemoteUsers();

  return (
    <div className="w-full h-[88vh]  flex ">
      {isConnected && (
        <div className="w-screen h-full flex gap-2 ">
          <div className="w-[80%] h-full flex flex-col ">
              {remoteUsers.map((user, index) => (
                  <div className="w-full h-full " key={index}>
                    <RemoteUser user={user} key={index} className="rounded-lg  ">
                      
                    </RemoteUser>
                  </div>
                ))}
                <div className="h-full w-full px-5 py-2 flex flex-col justify-end">
                          {/* <samp className="bg-red-600">llll</samp> */}
                          <Controls setCameraOn={setCameraOn} setMicOn={setMicOn} cameraOn={cameraOn} micOn={micOn} setCalling={setCalling}/>

                </div>
            
          </div>

          <div className="w-[20%] h-full flex flex-col justify-end">
            <div className="w-full h-[30vh]">
                <LocalUser
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                  audioTrack={localMicrophoneTrack}
                  className="rounded-lg"
                >
                  <samp className="pr-2 flex justify-end text-white text-2xl">you</samp>
                </LocalUser>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Controls(props){
  const {setMicOn,setCameraOn,micOn,cameraOn,setCalling}=props
  return(
    <div className="w-full h-[10vh] bg-white bg-opacity-20 rounded-lg  flex flex-between gap-2 ">

      <div className="w-full h-full flex justify-center gap-4 p-4">

        <div className={`callButton ${(micOn)? "bg-red-500":"bg-white"}  w-[10%] h-full flex items-center justify-center`} onClick={(e)=>setMicOn(!micOn)}>
          <IoMdVolumeMute/>
        </div>

        <button className={`callButton ${(cameraOn)? "bg-red-500":"bg-white"}  w-[10%] h-full flex items-center justify-center`} onClick={(e)=>setCameraOn(!cameraOn)}>
          <CiVideoOn/>
        </button>

        <button type="button" className="callButton bg-red-500  w-[10%] h-full flex items-center justify-center" onClick={(e)=>setCalling(a=>!a)} >
          <IoMdCall/>
        </button>

      </div>

    </div>
  )
}

export default AgoraVideoConsult;
