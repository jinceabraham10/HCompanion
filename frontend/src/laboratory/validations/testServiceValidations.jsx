import * as yup from 'yup'

export const testAddValidationSchema=yup.object().shape({
    // price:yup.string().required("Fill in the price").matches(/^(0|[1-9]\d*)(\.\d{1,2})?$/,"Not a number"),
    testId:yup.string().required("choose right category"),
    atHome:yup.boolean().required(),
    atLab:yup.boolean().required(),
    priceHome:yup.string().when('atHome',{
        is:true,
        then:()=>yup.string().required().matches(/^(0|[1-9]\d*)(\.\d{1,2})?$/,"Not a number"),
        otherwise:()=>yup.string()
        
    }),
    priceLab:yup.string().when('atLab',{
        is:true,
        then:()=>yup.string().required().matches(/^(0|[1-9]\d*)(\.\d{1,2})?$/,"Not a number"),
        otherwise:()=>yup.string()
        
    }),
    
// labId:yup.required()
}).test('atHome-or-atlab','Should choose any of them',(values)=>{
    console.log('jjjj',values)
    if(!values)
        return false
    return values.atHome || values.atLab
})

export const testResultAddValidationSchema=yup.object().shape({
    testResultDescription:yup.string().required("Shouldn't be left empty")
})