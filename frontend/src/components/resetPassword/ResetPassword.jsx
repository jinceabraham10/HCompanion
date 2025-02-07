import { FloatingLabel } from 'flowbite-react'
import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { useFormik } from 'formik'
import { resetPasswordSchema } from '../../validations/forgotPasswordValidations'
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux'
import { setUser } from '../../redux/slices/userSlice'
import { resetPassword, resetPasswordFromProfileService } from '../../services/loginService'



function ResetPassword({username}) {

    const {email}=useSelector((state)=>state.user)
    // console.log(`email ${email}`)

    const formik=useFormik({
        initialValues:{
            password:"",
            confirmPassword:""

        },
        validationSchema:resetPasswordSchema,
        onSubmit:async (values,actions)=>{

            const resetPassword=await resetPasswordFromProfileService({password:values.password,email:email})
            if(resetPassword){
                await Swal.fire({
                    icon:"success",
                    text:"Password has been reset"
                })
                window.location.reload()
            }

        }
    })


  return (
    <div className='w-full h-full'>
        <form onSubmit={formik.handleSubmit} className='w-full h-full flex flex-col gap-6'>
            <FloatingLabel variant='filled' label='New Password' type='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.password && ((formik.errors.password)?{color:"error",helperText:`${formik.errors.password}`}:{color:"success"}))}/>
            <FloatingLabel variant='filled' label='Confirm Password' type='password' name='confirmPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.confirmPassword && ((formik.errors.confirmPassword)?{color:"error",helperText:`${formik.errors.confirmPassword}`}:{color:"success"}))}/>
            <button type='submit'   className="w-full text-lg font-sm border rounded-[5%] bg-orange-500 p-2 flex gap-4 items-center justify-center"><CiEdit/>Save</button>
            
        </form>
      
    </div>
  )
}




export default ResetPassword
