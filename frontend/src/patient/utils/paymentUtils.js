import Swal from "sweetalert2";
import { bookSlotService } from "../services/patientDoctorServices";
import { paymentVerificationService } from "../services/paymentServices";

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
      alert(JSON.stringify(values));
      
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
                                                            

      // const bookedSlot=await bookSlotService({slotId:props._id,patientDescription:props.patientDescription,paymentId})
      
    },
    prefill: {
      name: props.patient.firstName,
      email: props.user.email,
      contact: props.user.phone,
    },
    notes: {
      address: "Health Companion Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
};
