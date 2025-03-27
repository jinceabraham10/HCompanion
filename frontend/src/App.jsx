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
import PasswordReset from './pharmacy/pages/passwordReset/PasswordReset'
import MedicinePage from './patient/pages/medicinePage/MedicinePage'
import MedicineDetails from './patient/pages/medicineDetailPage/MedicineDetails'
import PatientProfilePage from './patient/pages/profilePage/PatientProfilePage'
import PatientProfileDetails from './patient/pages/patientProfile/PatientProfileDetails'
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
import PharmacyHome from './pharmacy/pages/pharmacyHome/PharmacyHome'
import LaboratoryPageBasic from './laboratory/pages/laboratoryPageBasic/LaboratoryPageBasic'
import LaboratoryTestServicesBasic from './laboratory/pages/testServicesBasic/LaboratoryTestServicesBasic'
import LaboratoryAddTest from './laboratory/pages/addTest/LaboratoryAddTest'
import LaboratoryViewTests from './laboratory/pages/viewAddedTests/LaboratoryViewTests'
import LaboratoryEditTestDetailsPage from './laboratory/pages/EditTestDetails/LaboratoryEditTestDetailsPage'
import PatientLabTestsPage from './patient/pages/labTestPage/PatientLabTestsPage'
import PatientTestDetailsPage from './patient/pages/testDetailsPage/PatientTestDetailsPage'
import Patient_BookingsPageBasic from './patient/pages/patientBookingsPageBasic/Patient_BookingsPageBasic'
import Patient_CurrentBookingPage from './patient/pages/patientCurrentBookedPage/Patient_CurrentBookingPage'
import Doctor_BookingsBasic from './doctor/pages/doctorBookingsBasic/Doctor_BookingsBasic'
import Doctor_CurrentBookings from './doctor/pages/doctor_CurrentBookings/Doctor_CurrentBookings'
import AgoraVideoConsult from './onlineVideoConsult/AgoraVideoConsult'
import Patient_MeetingAlert from './patient/pages/meetingReminder/Patient_MeetingAlert'
import Doctor_PastBookings from './doctor/pages/doctor_pastBookings/Doctor_PastBookings'
import Doctor_PrescriptionPage from './doctor/pages/prescriptionPage/Doctor_PrescriptionPage'
import Doctor_MedicinePage from './doctor/pages/doctor_medicinePage/Doctor_MedicinePage'
import Patient_MedicineRequestPage from './patient/pages/medicineRequestsPage/Patient_MedicineRequestPage'
import Patient_MedicinePageBasic from './patient/pages/patientMedicinePageBasic/Patient_BookingsPageBasic'
import Patient_MedicineOrderedPage from './patient/pages/medicineOrderedPage/Patient_MedicineOrderedPage'
import Pharmacy_OrderBasic from './pharmacy/pages/pharmacyOrderBasic/Pharmacy_OrderBasic'
import Pharmacy_RecievedOrders from './pharmacy/pages/pharmacy_RecievedOrders/Pharmacy_RecievedOrders'
import Pharmacy_DeliveredOrders from './pharmacy/pages/pharmacy_deliveredOrders/Pharmacy_DeliveredOrders'
import Doctor_LaboratoryPage from './doctor/pages/doctor_laboratoryPage/Doctor_LaboratoryPage'
import DoctorLabTestsPage from './doctor/pages/labTestPage/DoctorLabTestsPage'
import Patient_TestPageBasic from './patient/pages/patientTestPageBasic/Patient_TestPageBasic'
import Patient_RequestedTestPage from './patient/pages/patient_requestedTestPage/Patient_RequestedTestPage'
import Laboratory_OrderBasic from './laboratory/pages/laboratoryOrderBasic/Laboratory_OrderBasic'
import Laboratory_TestOrdered from './laboratory/pages/laboratoryTestOrdered/Laboratory_TestOrdered'
import Laboratory_CompletedTestOrdered from './laboratory/pages/laboratoryCompletedTestOrdered/Laboratory_CompletedTestOrdered'
import Laboratory_TestResultPage from './laboratory/pages/laboratory_uploadTestResult.jsx/Laboratory_TestResultPage'
import Patient_PastBookingPage from './patient/pages/patientPastBookedPage/Patient_PastBookingPage'
import Patient_OrderedTestPage from './patient/pages/patient_orderedestPage/Patient_OrderedTestPage'
import PatientContactDetails from './patient/pages/contactDetails/PatientContactDetails'
import Patient_TestResultPage from './patient/pages/patient_uploadedTestResult.jsx/Laboratory_TestResultPage'
import Patient_PrescriptionPage from './patient/pages/patient_prescriptionPage/Patient_PrescriptionPage'
import Patient_PrescriptionDetailsPage from './patient/pages/patient_prescriptionDetailsPage/Patient_PrescriptionDetailsPage'
import Pharmacy_ProfileDetails from './pharmacy/pages/pharmacy_profileDetails/Pharmacy_ProfileDetails'
import Pharmacy_ContactPage from './pharmacy/pages/contactDetails/Pharmacy_ContactPage'
import LaboratoryProfileBasic from './laboratory/pages/laboratoryProfileBasic/LaboratoryProfileBasic'
import Laboratory_ProfileDetails from './laboratory/pages/laboratory_profileDetails/Laboratory_ProfileDetails'
import Laboratory_ContactPage from './laboratory/pages/laboratory_contactDetails/Laboratory_ContactPage'
import Admin_PageBasic from './admin/pages/admin_PageBasic/admin_PageBasic'
import PatientHome from './patient/pages/patientHome/PatientHome'
import DoctorHome from './doctor/pages/DoctorHome/DoctorHome'
import LaboratoryHome from './laboratory/pages/LaboratoryHome/LaboratoryHome'
import NotDoctorPageBasic from './doctor/pages/notdoctorPageBasic copy/NotDoctorPageBasic'
import Doctor_ApprovalForm from './doctor/pages/doctor_approvalSubmitForm/Doctor_ApprovalForm'
import Doctor_ApprovalFormSubmitted from './doctor/pages/doctor_approvalSubmitedForm/Doctor_ApprovalFormSubmitted'
import NotPharmacyPageBasic from './pharmacy/pages/noPharmacyPageBasic/NotPharmacyPageBasic'
import Pharmacy_ApprovalForm from './pharmacy/pages/pharmacy_approvalSubmitForm/Pharmacy_ApprovalForm'
import Pharmacy_ApprovalFormSubmitted from './pharmacy/pages/pharmacy_approvalSubmitedForm/Pharmacy_ApprovalFormSubmitted'
import NotLaboratoryPageBasic from './laboratory/pages/noLaboratoryPageBasic/NotLaboratoryPageBasic'
import Laboratory_ApprovalForm from './laboratory/pages/laboratory_approvalSubmitForm/Laboratory_ApprovalForm'
import Laboratory_ApprovalFormSubmitted from './laboratory/pages/laboratory_approvalSubmitedForm/Laboratory_ApprovalFormSubmitted'
import Doctor_OrderedTestPage from './doctor/pages/doctor_orderedestPage/Doctor_OrderedTestPage'
import Doctor_TestResultPage from './doctor/pages/doctor_uploadedTestResult.jsx/Doctor_TestResultPage'
import Admin_UsersPageBasic from './admin/pages/adminUsersPageBasic/Admin_UsersPageBasic'
import Admin_PatientPage from './admin/pages/admin_patientsPage/Admin_PatientPage'
import Admin_DoctorsPage from './admin/pages/admin_doctorsPage/Admin_DoctorsPage'
import Admin_PharmacyPage from './admin/pages/admin_pharmactPage/Admin_PharmacyPage'
import Admin_LaboratoryPage from './admin/pages/admin_laboratoryPage/Admin_LaboratoryPage'
import Admin_ApprovalPageBasic from './admin/pages/adminApprovalPageBasic/Admin_ApprovalPageBasic'
import Admin_ApprovalDoctorsPage from './admin/pages/admin_ApprovalDoctorPage/Admin_ApprovalDoctorsPage'
import Admin_ApprovalLaboratoryPage from './admin/pages/admin_ApprovalLaboratoryPage/Admin_ApprovalLaboratoryPage'
import Admin_ApprovalPharmacyPage from './admin/pages/admin_ApprovalPharmacyPage copy/Admin_ApprovalPharmacyPage'
import Admin_ApprovalDoctorDetails from './admin/pages/admin_approvalDoctorsDetails/Admin_ApprovalDoctorDetails'
import Admin_ApprovalPharmacyDetails from './admin/pages/admin_approvalPharmacyDetails/Admin_ApprovalPharmacyDetails'
import Admin_ApprovalLabDetailsPage from './admin/pages/admin_ApprovalLaboratoryDetailsPage/Admin_ApprovalLabDetailsPage'
import Patient_AddReview from './patient/pages/patient_addReview/Patient_AddReview'
import DoctorReviews from './patient/pages/patient_doctorReviews/DoctorReviews'



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
               <Route path='patient/home' element={<PatientHome/>}/>
               <Route path='/patient/medicines' element={<MedicinePage/>}/>
               <Route path='/patient/medicines/medicineDetails' element={<MedicineDetails/>}/>

               <Route path='/patient/profile' element={<PatientProfilePage/>}>
                    <Route index path='/patient/profile/details' element={<PatientProfileDetails/>}/>
                    <Route path='/patient/profile/contactDetails' element={<PatientContactDetails/>}/>
                    <Route path='/patient/profile/bookings' element={<Patient_BookingsPageBasic/>}>
                        <Route path='/patient/profile/bookings/currentBookings' element={<Patient_CurrentBookingPage/>}/>
                        <Route path='/patient/profile/bookings/pastBookings' element={<Patient_PastBookingPage/>}/>
                        <Route path='/patient/profile/bookings/review' element={<Patient_AddReview/>}/>
                    </Route>

                    <Route path='/patient/profile/medicine' element={<Patient_MedicinePageBasic/>}>
                        <Route path='/patient/profile/medicine/requests' element={<Patient_MedicineRequestPage/>}/>
                        <Route path='/patient/profile/medicine/ordered' element={<Patient_MedicineOrderedPage/>}/>
                    </Route>

                    <Route path='/patient/profile/test' element={<Patient_TestPageBasic/>}>
                        <Route path='/patient/profile/test/requests' element={<Patient_RequestedTestPage/>}/>
                        <Route path='/patient/profile/test/ordered' element={<Patient_OrderedTestPage/>}/>
                        <Route path='/patient/profile/test/ordered/uploadResult' element={<Patient_TestResultPage/>}/>
                        
                    </Route>

                    <Route path='/patient/profile/prescription' element={<Patient_PrescriptionPage/>}/>
                    <Route path='/patient/profile/prescription/details/:patientId/:bookingId' element={<Patient_PrescriptionDetailsPage/>}/>
                      

                    
               </Route>

               <Route path='/patient/doctors' element={<PatientDoctorPage/>}>
                   <Route path='/patient/doctors/:doctorId' element={<SideBookingDetailsPage/>}/>     
               </Route>

               //test

               <Route path='/patient/tests' element={<PatientLabTestsPage/>}/>
               <Route path='/patient/tests/testDetails' element={<PatientTestDetailsPage/>}/>
              
               <Route path='/patient/treatmentPlan' element={<TreatmentPlan/>}/>
               <Route path='/patient/alerts' element={<Patient_MeetingAlert/>}/>
               <Route path='/patient/reviews' element={<DoctorReviews/>}/>

          </Route>
          
          //video
          <Route path='/patient/bookings/videoConsult' element={<AgoraVideoConsult/>}/>


          //pharmcacy

          <Route path='/pharmacy' element={<PharmacyBasic/>}>
                <Route path='/pharmacy/home' element={<PharmacyHome/>}/>
                <Route path='/pharmacy/stock/addCategory' element={<AddStock/>}/>
                <Route path='/pharmacy/stock/viewStocks' element={<StockPage/>}/>
                <Route path='/pharmacy/stock/editStock' element={<EditStock/>}/>
                <Route path='/pharmacy/profile' element={<PharmacyProfileBasic/>}>
                       <Route path='/pharmacy/profile/profileDetails' element={<Pharmacy_ProfileDetails/>}/>
                       <Route path='/pharmacy/profile/contactDetails' element={<Pharmacy_ContactPage/>}/>
                       <Route path='/pharmacy/profile/passwordReset' element={<PasswordReset/>}/>
                </Route>
                <Route path='/pharmacy/order' element={<Pharmacy_OrderBasic/>}>
                          <Route path='/pharmacy/order/requested' element={<Pharmacy_RecievedOrders/>}/>
                          <Route path='/pharmacy/order/delivered' element={<Pharmacy_DeliveredOrders/>}/>
                </Route>
          </Route> 

          <Route path='/pharmacy/approval' element={<NotPharmacyPageBasic/>}>
               <Route path='/pharmacy/approval/form' element={<Pharmacy_ApprovalForm/>}/>
               <Route path='/pharmacy/approval/submitted' element={<Pharmacy_ApprovalFormSubmitted/>}/>
          
          </Route> 


          //Doctor

          <Route path='/doctor' element={<DoctorPageBasic/>}>
             <Route path='/doctor/slot' element={<SlotSettingPage/>}/>
             <Route path='/doctor/home' element={<DoctorHome/>}/>
             <Route path='/doctor/profile' element={<DoctorProfilePageBasic/>}>
                       <Route path='/doctor/profile/details' element={<DoctorProfileDetails/>}/>
                       <Route path='/doctor/profile/contact' element={<DoctorContactPage/>}/>
                       <Route path='/doctor/profile/resetPassword' element={<DoctorResetPassword/>}/>
             </Route>
             <Route path='/doctor/bookings' element={<Doctor_BookingsBasic/>}>
                 <Route path='/doctor/bookings/currentBookings' element={<Doctor_CurrentBookings/>}/>
                 <Route path='/doctor/bookings/pastCompletedBookings' element={<Doctor_PastBookings/>}/>
                 <Route path='/doctor/bookings/prescription/:patientId/:bookingId' element={<Doctor_PrescriptionPage/>}/>
                 <Route path='/doctor/bookings/medicine/:patientId/:bookingId' element={<Doctor_MedicinePage/>}/>
                 <Route path='/doctor/bookings/labtest/:patientId/:bookingId' element={<DoctorLabTestsPage/>}/>
                 <Route path='/doctor/bookings/labtest/testDetails/:patientId/:bookingId/:testId' element={<Doctor_LaboratoryPage/>}/>
                 <Route path='/doctor/bookings/test/ordered' element={<Doctor_OrderedTestPage/>}/>
                 <Route path='/doctor/bookings/test/completed/details' element={<Doctor_TestResultPage/>}/>
             </Route>

          
          </Route>

          <Route path='/doctor/approval' element={<NotDoctorPageBasic/>}>
               <Route path='/doctor/approval/form' element={<Doctor_ApprovalForm/>}/>
               <Route path='/doctor/approval/submitted' element={<Doctor_ApprovalFormSubmitted/>}/>
          
          </Route>

          //Laboratory

          <Route path='/laboratory' element={<LaboratoryPageBasic/>}>
              <Route path='/laboratory/home' element={<LaboratoryHome/>}></Route>
              <Route path='/laboratory/testServices' element={<LaboratoryTestServicesBasic/>}>
                   <Route path='/laboratory/testServices/addTest' element={<LaboratoryAddTest/>}/>
                   <Route path='/laboratory/testServices/viewTests' element={<LaboratoryViewTests/>}/>
                   <Route path='/laboratory/testServices/editTestDetails' element={<LaboratoryEditTestDetailsPage/>}/>
                   
              </Route>

              <Route path='/laboratory/order' element={<Laboratory_OrderBasic/>}>
                  <Route path='/laboratory/order/test/ordered' element={<Laboratory_TestOrdered/>}/>
                  <Route path='/laboratory/order/test/completed' element={<Laboratory_CompletedTestOrdered/>}/>
                  <Route path='/laboratory/order/test/completed/uploadResult' element={<Laboratory_TestResultPage/>}/>
                          
              </Route>
              <Route path='/laboratory/profile' element={<LaboratoryProfileBasic/>}>
                       <Route path='/laboratory/profile/profileDetails' element={<Laboratory_ProfileDetails/>}/>
                       <Route path='/laboratory/profile/contactDetails' element={<Laboratory_ContactPage/>}/>
                       <Route path='/laboratory/profile/passwordReset' element={<PasswordReset/>}/>
                </Route>
                
          </Route>

          <Route path='/laboratory/approval' element={<NotLaboratoryPageBasic/>}>
               <Route path='/laboratory/approval/form' element={<Laboratory_ApprovalForm/>}/>
               <Route path='/laboratory/approval/submitted' element={<Laboratory_ApprovalFormSubmitted/>}/>
          
          </Route>



          //Admin

          <Route path='/admin' element={<Admin_PageBasic/>}>
            {/* <Route path='/admin/' element={<SlotSettingPage/>}/> */}
            <Route path='/admin/users' element={<Admin_UsersPageBasic/>}>
                      <Route path='/admin/users/patient' element={<Admin_PatientPage/>}/>
                      <Route path='/admin/users/doctors' element={<Admin_DoctorsPage/>}/>
                      <Route path='/admin/users/pharmacy' element={<Admin_PharmacyPage/>}/>
                      <Route path='/admin/users/laboratory' element={<Admin_LaboratoryPage/>}/>
                      
            </Route>
            <Route path='/admin/approval' element={<Admin_ApprovalPageBasic/>}>
                      <Route path='/admin/approval/doctors' element={<Admin_ApprovalDoctorsPage/>}/>
                      <Route path='/admin/approval/pharmacy' element={<Admin_ApprovalPharmacyPage/>}/>
                      <Route path='/admin/approval/laboratory' element={<Admin_ApprovalLaboratoryPage/>}/>
                      <Route path='/admin/approval/doctorDetails' element={<Admin_ApprovalDoctorDetails/>}/>
                      <Route path='/admin/approval/pharmacyDetails' element={<Admin_ApprovalPharmacyDetails/>}/>
                      <Route path='/admin/approval/LaboratoryDetails' element={<Admin_ApprovalLabDetailsPage/>}/>
                      
            </Route>
      


          </Route>


        </Routes>
      </Router>
    </>
  )
}

export default App
