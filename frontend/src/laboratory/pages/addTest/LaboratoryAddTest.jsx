import React, { useEffect, useState } from 'react'
import TestServiceHeader from '../../components/testServicesOptions/TestServiceHeader'
import { FloatingLabel } from 'flowbite-react'
import { laboratory_addTestService, laboratory_getTestsPresentService } from '../../services/laboratoryTestServices'
import {useFormik} from 'formik'
import { testAddValidationSchema } from '../../validations/testServiceValidations'
import Swal from 'sweetalert2'

function LaboratoryAddTest() {

  const formik=useFormik({
    initialValues:{
      testId:"",
      price:""
      
    },
    validationSchema:testAddValidationSchema,
    onSubmit:async (values,actions)=>{
      const addedTest=await laboratory_addTestService(values)
      if(addedTest){
        Swal.fire({
          icon:"success",
          text:"Test Service has been added"
        })
      }

    }
  })

  const [tests,setTests]=useState([])
  const [selectedTest,setSelectedTest]=useState(undefined)
  // console.log('selectedTest',selectedTest)
  // const [selectedTest,setselectedTest]=useState({})

  const handleTestName=async (e)=>{
    const tempTest=tests?.find((test)=>test.testName==e.target.value)
    setSelectedTest(tempTest)
    if(tempTest){
      await formik.setFieldValue('testId',tempTest._id)
      // await formik.setFieldError('testId',undefined)
      
    }
    else {
      await formik.setFieldValue('testId',"")
      // await formik.setFieldError('testId',"Enter the correct category")

    }
     
  formik.setFieldTouched('testId',true)  

    
  }





  const [testImage,setTestImage]=useState(null)

  const onLoad=async ()=>{
    const tempTests=await laboratory_getTestsPresentService()
    await setTests(tempTests)
  
    

  }

  useEffect(()=>{
    onLoad()

  },[])

  // console.log('values',formik.values)
  // console.log('errors',formik.errors)

  return (
    <div className='w-full h-full flex flex-col items-center  '>
      <form onSubmit={formik.handleSubmit} className='w-[80%] h-full flex flex-col gap-5 pt-20 px-5 '>
        <h1 className='font-bold text-emerald-400 text-2xl'>Test</h1>
        <div className='w-full h-auto flex flex-row gap-5 '>

            <div className='w-[60%] h-full flex flex-col gap-5'>

                <FloatingLabel list='tests' name="testName" variant='filled' label='Test Type' onChange={handleTestName} onBlur={(e)=>formik.setFieldTouched('testId',true)}  {...(formik.touched.testId&& ((formik.errors.testId)?{color:"error",helperText:`${formik.errors.testId}`}:{color:"success"}))}/>
                <div>
                  <datalist id='tests'>
                    {
                      (tests)&&(tests.map((test,index)=>(
                        <option value={test.testName} key={index}/>
                      )))
                    }

                  </datalist>
                </div>

                <textarea label=' Test Description'  rows='10' value={(selectedTest) && (selectedTest.testDescription)} placeholder='Test Description'/>
                <FloatingLabel variant='filled' label='Price' name="price" onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.price && ((formik.errors.price)?{color:"error",helperText:`${formik.errors.price}`}:{color:"success"}))} />

                <button type="submit" className='w-[full] h-[5vh] border rounded-[5%] bg-orange-500 p-2'>Add Test</button>

            </div>

            <div className='w-[30%] h-[70%] flex flex-col'>
              <img src={(selectedTest)&&selectedTest.testImage }  className='h-full w-full object-fit' alt="testImage" />


            </div>
        </div>
        
          

      </form>
     

      
    </div>
  )
}

export default LaboratoryAddTest
