const RAZOR_PAY_ID = import.meta.env.RAZOR_PAY_ID;

export const paymentOption = (props) => {
  return {
    key: RAZOR_PAY_ID, // Enter the Key ID generated from the Dashboard
    amount: props.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Health Companion",
    description: "Book Patient",
    image: "/normalUser.png",
    order_id: props.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
      
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
