import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import StockOptions from '../../components/stockPageOption/StockOptions'
import { FileInput, FloatingLabel } from 'flowbite-react'
import { getMedicineFromApi } from '../../services/medicineService'
import { useFormik } from "formik";
import { medicineAddValidationSchema } from '../../validations/stockMedicineAddValidations'
import { addNewMedicine } from '../../services/pharmacyStockService'
import { useNavigate } from 'react-router-dom'

function AddStock() {

  const [medicineList,setMedicineList]=useState([])
  const navigate=useNavigate()

  const formik=useFormik({
    initialValues:{
          medicineName:"",
          description:"",
          costPrice:"",
          sellingPrice:"",
          medicineType:"",
          medicineImage:""
    },
    validationSchema:medicineAddValidationSchema,
    onSubmit:async (values,actions)=>{
      console.log(`values ${JSON.stringify(values)}`)
      const addedMedicine=await addNewMedicine(values)
      if(addedMedicine){
        navigate('/pharmacy/home')
      }

    }
  })

  const onLoad=async ()=>{

    const medicineList=await getMedicineFromApi()
    console.log(`${JSON.stringify(medicineList)}`)
    await setMedicineList(medicineList)

  }


  const handleFileChange = (e, filename) => {
    try {
      const file = e.target.files[0];
      formik.setFieldValue("medicineImage", file);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    onLoad()  
  },[])

  
  console.log(formik.errors)


  return (
    <div className='screen w-full h-full flex flex-row'>
        {/* <div className='fixed header w-[21%] h-[100vh] drop-shadow-lg '>
            <NavBar/>
        </div> */}
        <div style={{ backgroundImage:`url('/icons/pharmacyBg.jpg')`,
                      backgroundRepeat:'no-repeat',
                      backgroundSize:'cover',
                      backgroundPosition:'center'}}

        //  className='contentPage relative w-[79%] ml-[21vw] right-[0] h-full flex flex-1 flex-col gap-4'
        className='w-full h-full flex flex-1 flex-col gap-4'
         >

          <div className='w-full h-full overflow-y-scroll pt-4 flex flex-1 flex-col gap-4 bg-black bg-opacity-70'>
              <StockOptions/>
              <div className='addForm flex justify-center w-full h-[100%] mt-10 mb-[5vh]'>
                <form onSubmit={formik.handleSubmit} className='w-[40%] h-[100%] p-4 flex flex-col gap-6 border shadow-xl bg-white'>
                  <span>
                    <h1 className='font-bold text-xl text-emerald-500'>New Medicine</h1>
                  </span>
                  <FloatingLabel list="medicines" variant='filled' name="medicineName" placeholder='medicine name' onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.medicineName && ((formik.errors.medicineName)?{color:"error",helperText:`${formik.errors.medicineName}`}:{color:"success"}))}/>
                  <div>
                  <datalist id="medicines">
                        {medicineList && medicineList.length > 0 ? (
                          medicineList.map((medicine, index) => (
                            <option value={medicine.name} key={index} />
                          ))
                        ) : (
                          <option value="No Medicines Available" />
                        )}
                  </datalist>
                  </div>
                  <FloatingLabel variant='filled' name="medicineType" placeholder='medicineType' onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.medicineType && ((formik.errors.medicineType)?{color:"error",helperText:`${formik.errors.medicineType}`}:{color:"success"}))} />
                  <FloatingLabel variant='filled' name="description" placeholder='description' onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.description && ((formik.errors.description)?{color:"error",helperText:`${formik.errors.description}`}:{color:"success"}))}/>
                  <FloatingLabel variant='filled' name="costPrice" placeholder='cost price' onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.costPrice && ((formik.errors.costPrice)?{color:"error",helperText:`${formik.errors.costPrice}`}:{color:"success"}))}/>
                  <FloatingLabel variant='filled' name="sellingPrice" placeholder='selling price' onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.sellingPrice && ((formik.errors.sellingPrice)?{color:"error",helperText:`${formik.errors.sellingPrice}`}:{color:"success"}))}/>
                  <div>
                  <FileInput id="id_medicineImage" accept='image/jpeg, image/png' name='medicineImage' helperText="Upload Image" onChange={handleFileChange} onBlur={formik.handleBlur} {...(formik.touched.medicineImage && ((formik.errors.medicineImage)?{color:"error",helperText:`${formik.errors.medicineImage}`}:{color:"success"}))}/>            
                  </div>
                  
                  <button type="submit" className='w-[full] h-[10%] border rounded-[5%] bg-orange-500 p-2 font-bold'>
                    Add Medicine to the Inventory
                  </button>
                </form>

              </div>
          </div>

          

        </div>
    </div>
  )
}



export default AddStock
