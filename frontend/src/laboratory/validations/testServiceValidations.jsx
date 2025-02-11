import * as yup from 'yup'

export const testAddValidationSchema=yup.object().shape({
    price:yup.string().required("Fill in the price").matches(/^(0|[1-9]\d*)(\.\d{1,2})?$/,"Not a number"),
    testId:yup.string().required("choose right category"),
// labId:yup.required()
})