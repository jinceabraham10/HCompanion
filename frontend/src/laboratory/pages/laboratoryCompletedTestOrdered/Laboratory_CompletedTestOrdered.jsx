import React, { useEffect, useState } from 'react'
import { laboratory_getCompletedOrderedTestsService, laboratory_getOrderedTestsService } from '../../services/laboratoryTestServices'
import Laboratory_CompletedOrderedTestCard from '../../components/laboratory_CompletedOrderedTestCard/Laboratory_CompletedOrderedTestCard'


function Laboratory_CompletedTestOrdered() {
    const [testsOrdered,setTestsOrdered]=useState([])
    const onLoad=async ()=>{
        const tempOrders=await laboratory_getCompletedOrderedTestsService()
        setTestsOrdered(tempOrders)
    }

    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col'>

            <div className='orders w-full h-full flex flex-col gap-5 p-5'>
                {
                    (testsOrdered.length>0) && (testsOrdered.map((order,index)=>(
                        <div className='w-[90%] h-auto' key={index}>
                            <Laboratory_CompletedOrderedTestCard testOrder={order}/>

                        </div>
                    )))
                }

            </div>


        </div>
      
    </div>
  )
}

export default Laboratory_CompletedTestOrdered
