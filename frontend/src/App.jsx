import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './login/Login'
import Registeration from './registeration/Registeration'
import PatientHomePage from './patient/pages/PatientHomePage'
import PharmacyHomePage from './pharmacy/pages/PharmacyHomePage'
import AddStock from './pharmacy/pages/addStock/AddStock'
import StockPage from './pharmacy/pages/stockPage/StockPage'
import PharmacyBasic from './pharmacy/pages/PharmacyBasic'
import EditStock from './pharmacy/pages/editStock/EditStock'
import PharmacyProfileBasic from './pharmacy/pages/pharmacyProfile/PharmacyProfileBasic'
import PharmacyProfileDetails from './pharmacy/pages/profileDetails/PharmacyProfileDetails'
import PharmacyContactDetails from './pharmacy/pages/contactDetails/PharmacyContactDetails'
import PasswordReset from './pharmacy/pages/passwordReset/PasswordReset'
import MedicinePage from './patient/pages/medicinePage/MedicinePage'
import MedicineDetails from './patient/pages/medicineDetailPage/MedicineDetails'
import PatientProfilePage from './patient/pages/profilePage/PatientProfilePage'
import PatientProfileDetails from './patient/pages/patientProfile/PatientProfileDetails'
import PatientContactDetails from './patient/pages/contactDetails/patientContactDetails'
import DoctorPageBasic from './doctor/pages/doctorPageBasic/DoctorPageBasic'
import SlotSettingPage from './doctor/pages/slotSet/SlotSettingPage'
import PatientDoctorPage from './patient/pages/doctorPage/PatientDoctorPage'
import SideBookingDetailsPage from './patient/pages/sideBookingPage/SideBookingDetailsPage'
import TreatmentPlan from './patient/pages/treatmentPlan/TreatmentPlan'
import DoctorProfilePageBasic from './doctor/pages/profilePage/DoctorProfilePageBasic'
import DoctorProfileDetails from './doctor/pages/profileDetails/DoctorProfileDetails'
import DoctorContactPage from './doctor/pages/doctorProfileContactPage/DoctorContactPage'
import ResetPassword from './components/resetPassword/ResetPassword'
import DoctorResetPassword from './doctor/pages/doctorResetPassword/DoctorResetPassword'



function App() {
  

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Login/>}/> */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registeration/>}/>

          //Patient

          <Route path='/' element={<PatientHomePage/>}>
               
               <Route path='/patient/medicines' element={<MedicinePage/>}/>
               <Route path='/patient/medicines/medicineDetails' element={<MedicineDetails/>}/>

               <Route path='/patient/profile' element={<PatientProfilePage/>}>
                    <Route index path='/patient/profile/details' element={<PatientProfileDetails/>}/>
                    <Route path='/patient/profile/contactDetails' element={<PatientContactDetails/>}/>
               </Route>

               <Route path='/patient/doctors' element={<PatientDoctorPage/>}>
                   <Route path='/patient/doctors/:doctorId' element={<SideBookingDetailsPage/>}/>     
               </Route>

               <Route path='/patient/treatmentPlan' element={<TreatmentPlan/>}/>

          </Route>


          //pharmcacy

          <Route path='/pharmacy' element={<PharmacyBasic/>}>
                <Route path='/pharmacy/home' element={<PharmacyHomePage/>}/>
                <Route path='/pharmacy/stock/addCategory' element={<AddStock/>}/>
                <Route path='/pharmacy/stock/viewStocks' element={<StockPage/>}/>
                <Route path='/pharmacy/stock/editStock' element={<EditStock/>}/>
                <Route path='/pharmacy/profile' element={<PharmacyProfileBasic/>}>
                       <Route path='/pharmacy/profile/profileDetails' element={<PharmacyProfileDetails/>}/>
                       <Route path='/pharmacy/profile/contactDetails' element={<PharmacyContactDetails/>}/>
                       <Route path='/pharmacy/profile/passwordReset' element={<PasswordReset/>}/>
                </Route>
          </Route>  


          //Doctor

          <Route path='/doctor' element={<DoctorPageBasic/>}>
             <Route path='/doctor/slot' element={<SlotSettingPage/>}/>
             <Route path='/doctor/profile' element={<DoctorProfilePageBasic/>}>
                       <Route path='/doctor/profile/details' element={<DoctorProfileDetails/>}/>
                       <Route path='/doctor/profile/contact' element={<DoctorContactPage/>}/>
                       <Route path='/doctor/profile/resetPassword' element={<DoctorResetPassword/>}/>
             </Route>
          
          </Route>


        </Routes>
      </Router>
    </>
  )
}

export default App
