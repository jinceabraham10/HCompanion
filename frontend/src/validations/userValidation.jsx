import * as yup from "yup"

export const loginValidation=yup.object().shape({
    username: yup.string().required("shouldn't be left empty").min(5,"minimum of 5 letters"),
    password:yup.string().required("Required").min(2,"shouldn't be less than 8")
})


