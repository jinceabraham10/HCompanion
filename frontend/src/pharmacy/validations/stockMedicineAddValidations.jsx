import * as yup from 'yup'

export const medicineAddValidationSchema=yup.object().shape({
    medicineName:yup.string().required("Required"),
    description:yup.string().required("required"),
    costPrice:yup.string(),
    sellingPrice:yup.string().required("required"),
    medicineType:yup.string().required("required"),
    medicineImage:yup.mixed().required("required")
})

export const medicineEditValidationSchema=yup.object().shape({
    medicineName:yup.string().required("Required"),
    description:yup.string().required("required"),
    costPrice:yup.string().required('required'),
    sellingPrice:yup.string().required("required"),
    medicineType:yup.string().required("required"),
})