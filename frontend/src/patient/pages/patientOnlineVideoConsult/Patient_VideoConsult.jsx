import React from 'react'
import {JitsiMeeting} from "@jitsi/react-sdk";

function Patient_VideoConsult() {
  const notification=async ()=>{
    Notification.re
  }
  return (
    <div className='w-screen h-screen flex flex-col'>
        <div className='w-screen h-screen '>
          <JitsiMeeting
            roomName='consultation'
            className='h-full w-full'
            configOverwrite={
              {
                disableModeratorIndicator:true
              }
            }
            getIFrameRef = { (iframeRef) => { iframeRef.style.height = '100vh';iframeRef.style.width = '100vw' }
           }
          
           
          
          /> 
           
        </div>
      
    </div>
  )
}

export default Patient_VideoConsult
