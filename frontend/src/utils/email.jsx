export const maskedEmail=(email)=>{
    try {

        const [localpart,domain]=email.split('@')
        const maskedpart=localpart.slice(0,4)+"************"
        return `${maskedpart}@${domain}`
        
    } catch (error) {
        console.log(error)
        
    }

}