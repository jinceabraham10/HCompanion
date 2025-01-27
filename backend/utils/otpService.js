const speakeasy=require("speakeasy")

exports.registerationOtpGenerator=async ()=>{
    try {

        const secret=await speakeasy.generateSecret({length:20})
        // console.log(secret)
        const code=await speakeasy.totp({
            secret:secret.base32,
            encoding:'base32'
        })
        console.log(code)
        return code
        
    } catch (error) {
        console.log(error)
    }
}

exports.forgotPasswordOtpGenerator=async ()=>{
    try {

        const secret=await speakeasy.generateSecret({length:20})
        // console.log(secret)
        const code=await speakeasy.totp({
            secret:secret.base32,
            encoding:'base32'
        })
        console.log(code)
        return code
        
    } catch (error) {
        console.log(error)
    }
}