import axios from "axios";
import Swal from "sweetalert2";

const API = import.meta.env.VITE_API;

export async function registerPatient({otp,email}) {
  try {
    const response = await axios.post(
      `${API}/user/register/createPatient`,
      {otp,email},{withCredentials:true}
    );
    console.log(response.data);
    return response.data.CreationStatus;
  } catch (error) {
    if(error.response.status=="404"){
      Swal.fire("Otp has been expired")
    }
    console.log(error);
  }
}

export async function registerDoctor({otp,email}) {
  try {
    const response = await axios.post(
      `${API}/user/register/createPatient`,
      {otp,email},{withCredentials:true}
    );
    console.log(response.data);
    return response.data.CreationStatus;
  } catch (error) {
    if(error.response.status=="404"){
      Swal.fire("Otp has been expired")
    }
    console.log(error);
  }
}

export async function OtpGenerate(userData) {
  try {
    const response = await axios.post(`${API}/user/register/otp`, userData,{withCredentials:true});
    console.log(response.data);
    return response.data.info;
  } catch (error) {
    if (error.response.status == "401") {
      Swal.fire("User Already exist")
    }
    else if (error.response.status == "404") {
      Swal.fire({
        icon: "error",
        title: "Mail couldn't be send",
        text: "Some error occured while sending otp to mail",
      });
    } else {
      {
        Swal.fire({
          icon: "error",
          title: "Server Issue",
          text: "Some error Occurered in the server side , please try again..!",
        });
      }
    }
  }
}



