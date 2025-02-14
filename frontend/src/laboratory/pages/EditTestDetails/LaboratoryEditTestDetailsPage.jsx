import { FloatingLabel } from 'flowbite-react'
import React, { useEffect ,useState} from 'react'
import { useFormik } from 'formik'
import { laboratory_getTestDetailsService, laboratory_updateTestDetailsService } from '../../services/laboratoryTestServices'
import { useParams, useSearchParams } from 'react-router-dom'
import { testAddValidationSchema } from '../../validations/testServiceValidations'
import { MdEdit } from 'react-icons/md'
import Swal from 'sweetalert2'



function LaboratoryEditTestDetailsPage() {

  const [passedParams,setPassedParams]=useSearchParams()
  const [testDetails,setTestDetails]=useState(undefined)
  const [serviceOptions,setServiceOptions]=useState({})

   const formik=useFormik({
      initialValues:{
        testId:passedParams.get('testId'),
        priceHome:"",
        priceLab:"",
        atHome:false,
        atLab:false,  
      },
      validationSchema:testAddValidationSchema,
      onSubmit:async (values,actions)=>{
       
        const updated=await laboratory_updateTestDetailsService({...values,testName:passedParams.get('testId')})
        if(updated){
          Swal.fire({
            icon:"success",
            text:"Test Service has been updated"
          })
          await onLoad()
        }
  
      }
    })

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

  const onLoad=async ()=>{
    const tempTestDetails=await laboratory_getTestDetailsService({testName:passedParams.get('testName'),testId:passedParams.get('testId')})
    setTestDetails(tempTestDetails)
    formik.setFieldValue('atHome',tempTestDetails.atHome)
    formik.setFieldValue('atLab',tempTestDetails.atLab)
    formik.setFieldValue('priceHome',tempTestDetails.priceHome)
    formik.setFieldValue('priceLab',tempTestDetails.priceLab)

  }


  useEffect(()=>{
    onLoad()

  },[])


  return (
    <div className='w-full h-full flex flex-col'>
      <form onSubmit={formik.handleSubmit} className='w-full h-full flex  gap-4 px-6 py-20 justify-center'>

        <div className='detail w-[60%] h-auto flex flex-col gap-6 shadow-lg shadow-pink-500 p-4'>

          <h1 className='w-full font-medium text-2xl text-emerald-400 flex justify-center '>Update Test</h1>

          <FloatingLabel variant='filled' label='Test Name' value={testDetails?.testId?.testName}/>
          <textarea variant='filled' rows="20" label='Test Description' value={testDetails?.testId?.testDescription}/>

          <div className='w-full h-auto flex gap-2'>
                    <div className='flex flex-col gap-5 w-[50%]'>
                    
                        <div className='flex gap-4 items-center'>
                            <input type="checkbox" id="id_chkhome" name="home" value="home" onChange={handleCheckBox} checked={(formik.values.atHome)}/>
                            <span>Home</span>

                        </div>
                          {
                            (formik.values.atHome)&& 
                            <FloatingLabel variant='filled' label='Price at Home' name="priceHome" value={formik.values.priceHome} 
                                                                                                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                                                                  {...(formik.touched.priceHome)&&(formik.errors.priceHome?{color:"error",helperText:formik.errors.priceHome}:{color:"success"})}
                                                                                                  />
                          }                   
                                        
                    </div>


                    
                    <div className='flex flex-col gap-5 w-[50%]'>
                    
                          <div className='flex gap-4 items-center'>
                            <input type="checkbox" id="id_lab" name="lab" value="lab" onChange={handleCheckBox} checked={(formik.values.atLab)}/>
                            <span>Lab</span>

                        </div>

                          {
                                (formik.values.atLab)&&
                                <FloatingLabel variant='filled' label='Price at Lab' name="priceLab"  value={formik.values.priceLab} 
                                                                                                      onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                                                                      {...(formik.touched.priceLab)&&(formik.errors.priceLab?{color:"error",helperText:formik.errors.priceLab}:{color:"success"})}
                                                                                                      />                          

                          }
                
                    </div>

          </div>

          <button type="submit" className='w-[full] h-[5vh] border rounded-[5%] bg-orange-500 p-2 mb-5 flex gap-2 items-center justify-center'><MdEdit/>Update Test</button>

        </div>

        <div className='testImage flex  w-[20vw] h-full pt-20'>
          <img src={testDetails?.testId?.testImage} alt="test image" className='mt-5 object-fit h-[40vh] w-[20vw]' />

        </div>
        
        

      </form>
      
    </div>
  )
}

export default LaboratoryEditTestDetailsPage
