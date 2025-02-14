import React, { useEffect, useState } from 'react'
import TestServiceHeader from '../../components/testServicesOptions/TestServiceHeader'
import { FloatingLabel } from 'flowbite-react'
import { laboratory_addTestService, laboratory_getTestsPresentService } from '../../services/laboratoryTestServices'
import {useFormik} from 'formik'
import { testAddValidationSchema } from '../../validations/testServiceValidations'
import Swal from 'sweetalert2'

function LaboratoryAddTest() {

  const [serviceOptions,setServiceOptions]=useState({})
  const [tests,setTests]=useState([])
  const [selectedTest,setSelectedTest]=useState(undefined)

  // console.log('serviceOptions',serviceOptions)

  const formik=useFormik({
    initialValues:{
      testId:"",
      priceHome:"",
      priceLab:"",
      atHome:false,
      atLab:false,
      
      
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


const handleCheckBox=async (e)=>{
  await setServiceOptions({...serviceOptions,[e.target.name]:(serviceOptions[e.target.name])?false:true})
  if(e.target.name=='home'){
    await formik.setFieldValue('atHome',!formik.values.atHome)
    formik.setFieldTouched('atHome',true)
  }
  else if(e.target.name=='lab'){
    await formik.setFieldValue('atLab',!formik.values.atLab)
    formik.setFieldTouched('atLab',true)
  } 
  

}


  // const [testImage,setTestImage]=useState(null)

  const onLoad=async ()=>{
    const tempTests=await laboratory_getTestsPresentService()
    await setTests(tempTests)
  
    

  }

  useEffect(()=>{
    onLoad()

  },[])

  useEffect(()=>{
    const arr=[]
    Object.keys(serviceOptions).forEach((option)=>{
    if(serviceOptions[option])
      arr.push(option)
    })
   formik.setFieldValue('testType',arr)

  },[serviceOptions])

  

  console.log('values',formik.values)
  console.log('errors',formik.errors)

  return (
    <div className='w-full h-full flex flex-col items-center '>
      <form onSubmit={formik.handleSubmit} className='w-[80%] h-full flex flex-col gap-5 pt-20 px-5'>
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

                <div className='options w-full h-auto flex flex-col gap-10 '>
                    <h1 className='text-md font-medium'>Test Service Options</h1>
                    <div className='flex flex-1 gap-10 w-full'>
                      <div className='flex flex-col gap-5 w-[50%]'>

                        <div className='flex gap-4 items-center'>
                            <input type="checkbox" id="id_chkhome" name="home" value="home" onChange={handleCheckBox} checked={formik.va}/>
                            <span>Home</span>

                        </div>
                          {
                            (serviceOptions.home  ) && 
                            <FloatingLabel variant='filled' label='Price at Home' name="priceHome" onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.priceHome && ((formik.errors.priceHome)?{color:"error",helperText:`${formik.errors.priceHome}`}:{color:"success"}))} />
                          }                   
                          
                      </div>


                      <div className='flex flex-col gap-5 w-[50%]'>

                         <div className='flex gap-4 items-center'>
                            <input type="checkbox" id="id_lab" name="lab" value="lab" onChange={handleCheckBox}/>
                            <span>Lab</span>

                        </div>

                        {
                              (serviceOptions.lab)&&
                              <FloatingLabel variant='filled' label='Price at Lab' name="priceLab" onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.priceLab && ((formik.errors.priceLab)?{color:"error",helperText:`${formik.errors.priceLab}`}:{color:"success"}))} />                          

                        }

                      </div>

                    </div>

                </div>

                


                <button type="submit" className='w-[full] h-[5vh] border rounded-[5%] bg-orange-500 p-2 mb-5'>Add Test</button>

            </div>

            <div className='w-[30%] h-[40vh] flex flex-col'>
              <img src={(selectedTest)&&selectedTest.testImage }  className='h-full w-full object-fit' alt="testImage" />


            </div>
        </div>
        
          

      </form>
     

      
    </div>
  )
}

export default LaboratoryAddTest
