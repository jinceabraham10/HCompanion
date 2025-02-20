import * as yup from 'yup'

export const profileDetailsValidationSchema=yup.object().shape({
    firstName:yup.string(),
    lastName:yup.string(),
    bloodGroup:yup.string().matches(/^(A|B|AB|O)[+-]$/,"Not a valid Blood Group"),
    weight:yup.string().matches(/^[1-9][0-9]{0,5}(\.[0-9]{1,2})?$/,'Valid weight'),
    height:yup.string().matches(/^[1-9][0-9]{0,5}(\.[0-9]{1,2})?$/,'Valid height')
})


export const profileContactValidationSchema=yup.object().shape({
    place:yup.string(),
    state:yup.string(),
    country:yup.string(),
    pincode:yup.string().matches(/[1-9][0-9]{5}$/,'Valid Number'),
    district:yup.string(),
    phone:yup.array().of(yup.string().matches(/^[1-9][0-9]{9}$/,"not valid number"))
})


export const profileResetPasswordValidationSchema=yup.object().shape({
    password:yup.string(),
    confirmPassword:yup.string(),
    
})

