import { FileInput, FloatingLabel } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { createRoutesFromChildren, useLocation } from 'react-router-dom'
import { updateMedicineStock, viewMedicineDetails } from '../../services/pharmacyStockService'
import {useFormik} from 'formik'
import { medicineEditValidationSchema } from '../../validations/stockMedicineAddValidations'

function EditStock() {

    const [medicine,setMedicine]=useState(undefined)
    const [tempMedicineImage,setTempMedicineImage]=useState(undefined)

    const formik=useFormik({
        initialValues:{
            medicineName:"",
            description:"",
            costPrice:"",
            stock:"",
            sellingPrice:"",
            medicineType:"",
            medicineImage:""
      },
      validationSchema:medicineEditValidationSchema,
      onSubmit:async (values,actions)=>{
        const updated=await updateMedicineStock({medicine:{...values,inventoryId:inventoryId}})
        await onLoad()

      }
    })

    const location=useLocation()
    const {inventoryId}=location.state
    // console.log(inventoryId)

    // console.log(formik.values)

    const onLoad=async ()=>{    
        const tempMedicine=await viewMedicineDetails({inventoryId})
        console.log(`temp ${JSON.stringify(tempMedicine)}`)
        formik.setFieldValue('medicineName',tempMedicine.medicineId.medicineName)
        formik.setFieldValue('description',tempMedicine.medicineId.description)
        formik.setFieldValue('medicineType',tempMedicine.medicineId.medicineType)
        formik.setFieldValue('costPrice',tempMedicine.costPrice)
        formik.setFieldValue('sellingPrice',tempMedicine.sellingPrice)
        formik.setFieldValue('medicineImage',tempMedicine.medicineImage)
        formik.setFieldValue('stock',tempMedicine.stock)
        
        await setMedicine(tempMedicine)
    }

    const handleFile=async (e)=>{
        const file=e.target.files[0]
        // console.log(file)
        const reader=new FileReader(file)
        reader.onload=(e)=>{    
            const data=e.target.result
            setTempMedicineImage(data)
            formik.setFieldValue('medicineImage',file)
            // console.log(`url ${data}`)

        }
        const imageBuffer=reader.readAsDataURL(file)
        // console.log(`urls ${imageBuffer}`)
        
    }

    const handleMargin= (e)=>{
        console.log(parseFloat(e.target.value)+1)
        const sellingPrice= ((100+parseFloat(e.target.value))/100)*parseFloat(formik.values.costPrice)
        formik.setFieldValue('sellingPrice',sellingPrice.toFixed(2))
    }

    useEffect(()=>{
        onLoad()

    },[])
  return (
    
    <div className='w-full h-full overflow-y-auto pl-4 pt-5'>
        <div className='w-full h-[10%] text-center'>
            <h2 className='text-[5vh] text-emerald-400 font-bold'>Medicine Details</h2>
        </div>
        <div className='w-full h-full mt-10 flex justify-center gap-10'>
            <form onSubmit={formik.handleSubmit} className='w-[50%] flex flex-col gap-5 font-bold'>
                <FloatingLabel variant='filled' name='medicineName' label="Medicine Name"  value={formik.values.medicineName} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.medicineName && ((formik.errors.medicineName)?{color:"error",helperText:`${formik.errors.medicineName}`}:{color:"success"}))} />
                <FloatingLabel variant='filled' name='description' label="Description"  value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.description && ((formik.errors.description)?{color:"error",helperText:`${formik.errors.description}`}:{color:"success"}))}/>
                <FloatingLabel variant='filled' name='MedicineType' label="Medicine Type"  value={formik.values.medicineType} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.medicineType && ((formik.errors.medicineType)?{color:"error",helperText:`${formik.errors.medicineType}`}:{color:"success"}))}/>
                <FloatingLabel variant='filled' name='stock' label='Stock'  type='number' value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.stock && ((formik.errors.stock)?{color:"error",helperText:`${formik.errors.stock}`}:{color:"success"}))}/>
                <FloatingLabel variant='filled' name='margin' label="Margin %" onChange={handleMargin}/>
                <FloatingLabel variant='filled' name='costPrice' label="Cost Price"  value={formik.values.costPrice} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.costPrice && ((formik.errors.costPrice)?{color:"error",helperText:`${formik.errors.costPrice}`}:{color:"success"}))}/>
                <FloatingLabel variant='filled' name='sellingPrice' label="Selling Price"   value={formik.values.sellingPrice} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.sellingPrice && ((formik.errors.sellingPrice)?{color:"error",helperText:`${formik.errors.sellingPrice}`}:{color:"success"}))}/> 
                <button type="submit" className='w-[full] h-[5vh] border rounded-[5%] bg-orange-500 p-2'>Save Details</button>    
            </form>
            <div className='medicineImage w-[30%] flex flex-col gap-10 h-[60%]'>
                 <img src={(tempMedicineImage)?tempMedicineImage:formik.values.medicineImage} alt="medicineImage" className='h-[70%] w-[70%] shadow-2xl' />
                 <div>
                  <FileInput helperText="upload image" id='id_medicineImage' name='medicineImage' onChange={handleFile} onBlur={formik.handleBlur} {...(formik.touched.medicineImage && ((formik.errors.medicineImage)?{color:"error",helperText:`${formik.errors.medicineImage}`}:{color:"success"}))}/>
                 </div>
                 
            </div>

        </div>
      
    </div>
    
  )
}

export default EditStock
