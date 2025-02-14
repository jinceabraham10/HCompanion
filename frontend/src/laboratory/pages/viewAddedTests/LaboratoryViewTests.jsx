import React, { useEffect, useState } from 'react'
import { Table, TableRow } from "flowbite-react";
import { laboratory_deleteAddedTestervice, laboratory_getExistingTestService } from '../../services/laboratoryTestServices';
import { MdEdit,MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function LaboratoryViewTests() {
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='w-full h-full'>
            <TableTests/>
        </div>
      
    </div>
  )
}


function TableTests(props){

    const navigate=useNavigate()

    const [tests,setTests]=useState()

    const tableHeaders=['Test Name','image','on Home','on Clinic','Edit','Delete']

    const onLoad=async ()=>{
        
        const tempTests=await laboratory_getExistingTestService()
        setTests(tempTests)


    }


    useEffect(()=>{
        onLoad()

    },[])

    const handleDelete=async (e,test)=>{
        Swal.fire({
            showCancelButton:true,
            title:"Do you want to delete",
            text:"please click yes to proceed",
            confirmButtonText:"Delete"

        }).then(async (result)=>{
            if(result.isConfirmed){
                const deleted=await laboratory_deleteAddedTestervice({testId:test?.testId})
                if (deleted){
                    Swal.fire("Deleted","","success")
                    onLoad()

                }
                    
            }
                
        })
        
    }

    return(
        <div className='w-auto h-auto px-10 py-5'>
            <Table hoverable>
                <Table.Head>
                    {
                        (tableHeaders).map((headerOption,index)=>(
                            <Table.HeadCell key={index}>
                                {headerOption}
                            </Table.HeadCell>
                        ))
                    }
                    
                </Table.Head>
                <Table.Body className='font-bold text-black'>
                    {
                        (tests)&& tests.map((test,index)=>(
                            <Table.Row key={index} className='border border-b-black'>
                                <Table.Cell>
                                    {test.testId.testName}
                                </Table.Cell>
                                <Table.Cell>
                                    <img src={test.testId.testImage} className="w-[3vw] h-[4vh] object-fit" />
                                </Table.Cell>
                                <Table.Cell>
                                    {(test.atHome)?test.priceHome:"not available"}
                                </Table.Cell>
                                <Table.Cell>
                                    {(test.atLab)?test.priceLab:"not available"}
                                </Table.Cell>
                                <Table.Cell className='cursor-pointer' >
                                    <MdEdit onClick={()=>navigate(`/laboratory/testServices/editTestDetails/?testName=${test.testId.testName}&testId=${test.testId._id}`)}/>
                                </Table.Cell>
                                <Table.Cell className='cursor-pointer'>
                                    <MdDelete onClick={(e)=>handleDelete(e,test)}/>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>

        </div>
    )

}

export default LaboratoryViewTests
