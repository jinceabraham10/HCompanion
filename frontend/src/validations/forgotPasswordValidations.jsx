import * as yup from 'yup'

export const resetPasswordSchema=yup.object().shape({
    password:yup.string().required("Enter password").matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
    confirmPassword:yup.string().required("Enter confirmpassword").oneOf([yup.ref('password'),null],"Should be matching with password field")
})