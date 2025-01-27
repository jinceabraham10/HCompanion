import * as yup from 'yup'

export const otpSubmitValidation=yup.object().shape({
    email:yup.string().required("email required"),
    otp:yup.string().matches(/^[0-9]{6}$/,"Must be valid").required("Otp required")
})