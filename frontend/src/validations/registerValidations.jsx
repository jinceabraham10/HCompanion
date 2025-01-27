import * as yup from "yup";

export const registerValidation = yup.object().shape({
  username: yup.string().required("Username is Required"),
  email: yup.string().email("Provide valid email").required("Email is reuired"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "must contain atleast 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password"),null],"Password and Confirm password are not matching"),
  phone: yup
    .string()
    .matches(/^[1-9][0-9]{9}$/, "Must be a valid number").required("Phone number is required"),
    role:yup.string().required("Required")
});
