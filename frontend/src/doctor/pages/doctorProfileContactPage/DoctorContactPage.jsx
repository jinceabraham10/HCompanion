import { FloatingLabel } from 'flowbite-react'
import React,{useEffect} from 'react'
import { CiEdit } from 'react-icons/ci'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { doctor_getContactDetailsService, doctor_updateContactDetailsService } from '../../services/doctorProfileServices'
function DoctorContactPage() {
    const formik=useFormik({
        initialValues:{
            place:"",
            state:"",
            district:"",
            country:"",
            pincode:"",
            houseName:"",
            phone:""
        },
        validationSchema:yup.object().shape({       

        }),
        onSubmit:async (values,actions)=>{
            if(await doctor_updateContactDetailsService(values))
                onLoad()
            

        }   
    })


    const onLoad=async ()=>{
        const {phone,...tempContactDetails}=await doctor_getContactDetailsService()
        console.log('temp contact',tempContactDetails._doc)
        formik.setFieldValue('place',tempContactDetails._doc.place)
        formik.setFieldValue('state',tempContactDetails._doc.state)
        formik.setFieldValue('district',tempContactDetails._doc.district)
        formik.setFieldValue('country',tempContactDetails._doc.country)
        formik.setFieldValue('pincode',(tempContactDetails._doc.pincode)?tempContactDetails._doc.pincode:"")
        formik.setFieldValue('houseName',tempContactDetails._doc.houseName)
        formik.setFieldValue('phone',phone)

    }

    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full'>
        <div className='w-full h-full flex flex-col gap-4 items-center pt-10'>
            <div className='w-[70%] '>
                <h1 className='text-lg font-medium'>Address</h1>

            </div> 
            
            <form className='w-[70%]  grid grid-cols-2 gap-4'>
                                     
                <FloatingLabel variant='filled'  label='House Name' className='font-bold' name='houseName' onChange={formik.handleChange} value={formik.values.houseName}/>
                <FloatingLabel variant='filled' label='Place' className='font-bold' name='place' onChange={formik.handleChange} value={formik.values.place}/>
                <FloatingLabel variant='filled' label='District' className='font-bold' name='district' onChange={formik.handleChange} value={formik.values.district}/>
                <FloatingLabel variant='filled' label='State' className='font-bold' name='state' onChange={formik.handleChange} value={formik.values.state}/>
                <FloatingLabel variant='filled' label='Country' className='font-bold' name='country' onChange={formik.handleChange} value={formik.values.country}/>
                <FloatingLabel variant='filled' label='Pincode' className='font-bold' name='pincode' onChange={formik.handleChange} value={formik.values.pincode}/>
                
                
            </form>
            
            
            <form className='w-[70%] flex flex-col pt-10'>
                <div>
                    <h1 className='text-lg font-medium'>Contact Details</h1>
                </div>
                <div className='w-[30%] flex flex-col gap-4 mt-5 '>
                    <FloatingLabel variant='filled' label='Phone' className='font-bold' name='phone' onChange={formik.handleChange} value={formik.values.phone}/>
                </div>
            </form>

            <button type='button' onClick={formik.handleSubmit}  className="w-[70%] text-lg font-sm border rounded-[5%] bg-orange-500 p-2 flex gap-4 items-center justify-center"><CiEdit/>Save</button>
        </div>
      
    </div>
  )
}

export default DoctorContactPage
