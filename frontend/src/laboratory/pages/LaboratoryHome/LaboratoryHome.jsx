import React from 'react'
import { useSelector } from 'react-redux'

function LaboratoryHome() {
    // const {pharmacy}=useSelector((state)=>state.pharmacy)
    const {username}=useSelector((state)=>state.user)
    const {laboratoryName}=useSelector((state)=>state.laboratory)
  return (
    <div className='w-full h-full flex flex-col'>

        {/* top section */}
        <div className='w-full h-screen flex bg-[url(/icons/pharmacyHome.jpg)] bg-no-repeat bg-cover bg-center'>
            <div className='w-full h-screen flex flex-col bg-black bg-opacity-70'>
                
                <div className='welcome w-full flex flex-col items-center mt-10 text-white p-10 '>
                    <span className='text-[20vh] font-bold'>Welcome</span>
                    <span className='text-[10vh] font-bold'>{laboratoryName||username}</span>
                    <p className='text-[3vh]'>The HealthCompanion Laboratory Management</p>
                    

                </div>

                
            </div>


        </div>

        {/* Stock Management */}

        {/* <div className='stock w-full h-auto mt-5'>
            <div className='w-full h-[100vh] flex gap-10'>

                <div className='w-full h-auto flex justify-center'>
                  <img src="/normalUser.png" className='rounded-full object-fit h-[20vh] w-[10vw]' />

                </div>

            </div>

        </div> */}
      
    </div>
  )
}

export default LaboratoryHome
