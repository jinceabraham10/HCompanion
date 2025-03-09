import React, { useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import { Outlet } from 'react-router-dom'
import ChatBotComponent from '../components/chatbot/ChatBotComponent'

function PatientHomePage() {

  const [isChatBot,setIsChatBot]=useState(false)

  

  return (
    <div className='homePage w-full h-full'>
        <div className='header bg-white w-full h-[12vh] shadow-lg '>
            <NavBar/>
        </div>

        <div className='w-full h-full p-4 '>
           <Outlet/>

        </div>



        <div className='chatBot fixed w-auto h-auto right-2 bottom-0'>
         
          {
            (isChatBot) ?
            
            <div className='flex gap-6 items-start '>
             <div>
             <ChatBotComponent/> 
             </div>
              <button className='px-6 py-3 bg-red-500 text-white font-medium rounded-tl-2xl' onClick={()=>setIsChatBot(false)}>Close</button>
            </div>:

            <div className='relative w-auto h-[15vh]  right-10 bottom-0 flex flex-row gap-2'>
            <img src="/doctorBot.jpg" alt="chatbot" className=' z-100 shadow-lg rounded-full w-[5vw] h-[10vh] cursor-pointer' onClick={()=>setIsChatBot(true)} />
            <span className='h-[40%] p-2 rounded-tl-2xl  text-white font-medium bg-blue-500  '>Hey, i'm an Ai Doctor..!!</span>
            </div>
          }
          
          
        </div>

      
    </div>
  )
}

export default PatientHomePage
