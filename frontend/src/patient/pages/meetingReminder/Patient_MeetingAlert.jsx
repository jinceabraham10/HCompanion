import React from 'react'
import Patient_AlertCard from '../../components/patient_alertCard/Patient_AlertCard'
import { useSelector,useDispatch } from 'react-redux'
import { use } from 'react'

function Patient_MeetingAlert() {

  // const dispatch=useDispatch()
  // const {patient_meetingAlert}=useSelector((state)=>state.patient_alert)
 
  // console.log('patient alert',patient_meetingAlert)
  return (
    <div className='w-full h-full flex flex-col'>
        <div  className='w-full h-full flex flex-col p-2'>

            <div className='meetingAlert w-full h-full flex flex-col gap-2'>
                <h2 className='w-[80%] h-[8vh] text-lg font-medium flex items-center pl-10 bg-blue-500'>Notifications</h2>
                <div className='alerts flex flex-col hap-2'>
                    <Patient_AlertCard/>

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Patient_MeetingAlert
