import * as yup from 'yup'

export const bookingPaymentValidationSchema=yup.object().shape({
    amount:yup.string().matches(/^[1-9][0-9]{0,5}(\.[0-9]{1,2})?$/,"Invalid amount")
})