import Swal from "sweetalert2";
import { bookSlotService } from "../services/patientDoctorServices";
import { paymentVerificationService } from "../services/paymentServices";
import { patient_orderRequestedMedicineFromDoctorService } from "../services/medicineService";
import { patient_orderTestFromDoctorServcie } from "../services/patientLabTestServices";


const RAZOR_PAY_ID = import.meta.env.RAZOR_PAY_ID;

export const paymentOption = (props,values) => {

  // const handleBooking=async (values)=>{
  //   const bookedSlot=await bookSlotService(values)
  //   if(bookedSlot){
  //     Swal.fire({
  //       icon:"success",
  //       text:"The slot has been booked"
  //     })
  //   }
  // }
  const {order,patient,user,doctor}=props
  return {
    key: RAZOR_PAY_ID, // Enter the Key ID generated from the Dashboard
    amount: props.amount*1000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Health Companion",
    description: "Book Patient",
    image: "/logo.png",
    order_id: props.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler:async function (response) {
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      // // await console.log(order)
      // await alert(JSON.stringify(response))
      // alert(JSON.stringify(values));
      console.log("enterd payment handler")
      
      const bookedSlot=await paymentVerificationService({razorpay_order_id:response.razorpay_order_id,
                                                                razorpay_payment_id:response.razorpay_payment_id,
                                                                razorpay_signature:response.razorpay_signature,
                                                                doctorId:doctor._id,
                                                                order:order,
                                                                slotDetails:values  
                                                         })
      if(bookedSlot){
        Swal.fire({
          icon:"success",
          text:"The slot has been booked"
        })
      }
      else{
        Swal.fire({
          icon:"error",
          text:"The slot has been booked"
        })

      }
                                                            

      // const bookedSlot=await bookSlotService({slotId:props._id,patientDescription:props.patientDescription,paymentId})
      
    },
    prefill: {
      name: props.patient.firstName,
      email: props.user.email,
      contact: props.user.phone || "7902249173",
      "card[number]":"4111 1111 1111 1111",
      "card[expiry]":"12/30",
      "card[cvv]":"123"
    },
    notes: {
      address: "Health Companion Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
};

export const medicine_paymentOption = (props,values) => {

  // const handleBooking=async (values)=>{
  //   const bookedSlot=await bookSlotService(values)
  //   if(bookedSlot){
  //     Swal.fire({
  //       icon:"success",
  //       text:"The slot has been booked"
  //     })
  //   }
  // }
  const {order,medicineOrder}=props
  return {
    key: RAZOR_PAY_ID, // Enter the Key ID generated from the Dashboard
    amount: props.amount*1000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Health Companion",
    description: "Book Medicine",
    image: "/logo.png",
    order_id: props.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler:async function (response) {
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      // // await console.log(order)
      // await alert(JSON.stringify(response))
      // alert(JSON.stringify(values));
      
      const orderedMedicine=await patient_orderRequestedMedicineFromDoctorService({razorpay_order_id:response.razorpay_order_id,
        razorpay_payment_id:response.razorpay_payment_id,
        razorpay_signature:response.razorpay_signature,
        doctorId:medicineOrder.pharmacyInventoryId.la,
        order:order,
        pharmacyId:medicineOrder.pharmacyInventoryId.pharmacyId._id,
        pharmacyInventoryId:medicineOrder.pharmacyInventoryId._id})
      if(orderedMedicine){
          Swal.fire("Medicine has been ordere","","success")
      }
                                                            

      // const bookedSlot=await bookSlotService({slotId:props._id,patientDescription:props.patientDescription,paymentId})
      
    },
    prefill: {
      name: medicineOrder.patientId.firstName,
      email: medicineOrder?.patientId?.userId?.email,
      contact: medicineOrder?.patientId?.userId?.phone,
    },
    notes: {
      address: "Health Companion Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
};

export const labtest_paymentOption = (props,values) => {

  // const handleBooking=async (values)=>{
  //   const bookedSlot=await bookSlotService(values)
  //   if(bookedSlot){
  //     Swal.fire({
  //       icon:"success",
  //       text:"The slot has been booked"
  //     })
  //   }
  // }
  const {order,testOrder}=props
  return {
    key: RAZOR_PAY_ID, // Enter the Key ID generated from the Dashboard
    amount: props.amount*1000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Health Companion",
    description: "Book Test",
    image: "/logo.png",
    order_id: props.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler:async function (response) {
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      // // await console.log(order)
      // await alert(JSON.stringify(response))
      // alert(JSON.stringify(values));
      
      const orderedTest=await patient_orderTestFromDoctorServcie({razorpay_order_id:response.razorpay_order_id,
        razorpay_payment_id:response.razorpay_payment_id,
        razorpay_signature:response.razorpay_signature,
        labId:testOrder.labTestId.labId._id,
        order:order,
        testOrderId:testOrder._id})
      if(orderedTest){
          Swal.fire("Test has been ordered","","success")
      }
                                                            

      // const bookedSlot=await bookSlotService({slotId:props._id,patientDescription:props.patientDescription,paymentId})
      
    },
    prefill: {
      name: testOrder.patientId.firstName,
      email: testOrder?.patientId?.userId?.email,
      contact: testOrder?.patientId?.userId?.phone,
    },
    notes: {
      address: "Health Companion Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
};
