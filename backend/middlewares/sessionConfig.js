const dotenv=require("dotenv")
const session=require("express-session") 
const mongoDBStore=require("connect-mongodb-session")(session)
dotenv.config()

SECRET_KEY=process.env.SECRET_KEY
MONGO_URL=process.env.MONGO_URL

const store=new mongoDBStore({
    uri:MONGO_URL,
    collection:"sessions",
    expires:1000*60*5
})


const sessionMiddleware=session({
    secret:SECRET_KEY,
    resave:true,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge:1000*60*5,
        secure:false,
        httpOnly:true

    }

})



module.exports=sessionMiddleware