
import React,{useEffect, useState} from 'react'
import StockOptions from '../../components/stockPageOption/StockOptions'
import { Table } from 'flowbite-react'
import { deleteStock, viewStocks } from '../../services/pharmacyStockService'
import { useNavigate } from 'react-router-dom'

function  StockPage() {
  const [stockedMedicines,setstockedMedicines]=useState([])

  const onLoad=async ()=>{
    const medicines=await viewStocks()
    await setstockedMedicines(medicines)
  }

  useEffect(()=>{
    onLoad()
    
  },[])


  return (
    <div className='stockViewScreen w-full h-full p-2 flex flex-col gap-10 overflow-y-scroll'>
      <StockOptions/>
      <div className='w-full h-full mt-20 flex flex-col gap-2'>
        <div className='heading w-full  ml-20 mb-10  text-lg text-emerald-400 font-bold flex'>
          <h2>Medicine Stocks</h2>

        </div>
        {
          (stockedMedicines)&&(stockedMedicines.length>0)? <TableMedicines medicines={stockedMedicines}/>:
          <span className='w-full h-[70%] mb-10 text-xl font-bold flex flex-1 justify-center items-center '>
              No medicine Stock.....!!!
              </span>
        }
        
      </div>      
    </div>
  )
}

function TableMedicines(props){

  const navigate=useNavigate()

  const handleDelete=async (e,inventoryId)=>{
    console.log(inventoryId)
    const deleted=await deleteStock({inventoryId})
    navigate('/pharmacy/stock/viewStocks') 
  }

  const {medicines}=props
  return(
    <div className='w-full h-full mb-10 flex flex-1 justify-center '>
        <Table hoverable  className='w-full gap-x-10 ' >
          <Table.Head className='gap-x-72'>
            <Table.HeadCell>Medicine Name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>cost price</Table.HeadCell>
            <Table.HeadCell>selling price</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell> 
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
            
                    
          </Table.Head>

          <Table.Body className='font-bold'>
              {medicines.map((stock,index)=>(
                <Table.Row key={stock._id} className='border-b-4' id={`id_${index}`}>

                  <Table.Cell>
                    {stock.medicineId.medicineName}
                  </Table.Cell>

                  <Table.Cell>
                    {stock.medicineId.description}
                  </Table.Cell>

                  <Table.Cell>
                    {stock.medicineId.medicineType}
                  </Table.Cell>

                  <Table.Cell>
                    {stock.stock}
                  </Table.Cell>

                  <Table.Cell>
                    {stock.costPrice}
                  </Table.Cell>

                  <Table.Cell>
                    {stock.sellingPrice}
                  </Table.Cell>

                  <Table.Cell>
                    <img className='h-14' src={stock.medicineImage} alt="productImage" />
                  </Table.Cell>

                  <Table.Cell>
                    <img className='h-8 cursor-pointer' src="/icons/editIcon.png" alt="editIcon" id={`id_navEdit_${index}`} onClick={()=>{
                      navigate('/pharmacy/stock/editStock',{state:{inventoryId:stock._id}})
                    }}/>
                  </Table.Cell>

                  <Table.Cell>
                      <img className='h-8 cursor-pointer opacity-70' src="/icons/deleteIcon.png" alt="editIcon" id={`id_btnDelete_${index}`} onClick={(e)=>{handleDelete(e,stock._id)}}/>
                  </Table.Cell>

                  

                </Table.Row>
              ))}
          </Table.Body>

        </Table>

      </div>
  )
}

export default StockPage
