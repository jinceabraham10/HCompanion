import React from 'react'
import { useNavigate } from 'react-router-dom'

function StockOptions() {

    const navigate=useNavigate()
  return (
    <div className='w-full h-[12vh] py-2 flex flex-row justify-end gap-20  px-10 '>
        <div className='w-[15%] h-full'>
            <button className='w-full h-full p-4 font-bold rounded-sm flex items-center  bg-green-400  drop-shadow-xl' onClick={()=>{
                navigate('/pharmacy/stock/addCategory')
            }}>
                Add New Stock
            </button>
        </div>
        <div className='w-[15%] h-full'>
            <button className='w-full h-full p-4 font-bold rounded-sm flex items-center  bg-orange-500  drop-shadow-xl' id='id_btnViewStock' onClick={()=>{
                navigate('/pharmacy/stock/viewStocks')
            }}>
                View Stock
            </button>
        </div>
      
    </div>
  )
}

export default StockOptions
