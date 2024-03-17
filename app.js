import express, { urlencoded } from "express"
import userModal from "./model/userChema.js"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"


const app = express()

const PORT = 5001 || process.env.PORT

app.use(express.json())
app.use(urlencoded({extended: true}))

const uri = "mongodb+srv://devwasi763:admin@testing.sir1m1v.mongodb.net/"

mongoose.connect(uri)

mongoose.connection.on("connected", ()=>console.log("MongoDB Connected"))
mongoose.connection.on("error", (err)=>console.log("MongoDB Connected", err))

app.listen(PORT)

app.get("/",(req, res)=>{
console.log("res")
res.json({
    "message": "server Up"
})
})

// sign up request from client side 

app.post("/api/signup",async (req, res)=>{
    try {
        const {firstName, lastName, email, password} = req.body
        console.log(firstName, lastName, email, password)

        if(!firstName || !lastName || !email || !password){
            res.json({
                message: "required fields are missing",
                data: null,
                status: false
            })
            return
        }

        const emailExist = await userModal.findOne({email})

        if(emailExist !== null){
            res.status(400).json({
                message: "email already exist"
            })
            return
        }

        const hashPassword = await bcrypt.hash(password,10)

        const obj = {
            ...req.body,
            password: hashPassword
        }

        const response = await userModal.create(obj)
        console.log(response,"response")
        res.json({
            message: "sign up successfully",
            status: true
        })

} catch (error) {
    res.json({
        message: error.message,
        status: false
    })
    
}
})





console.log(`server is running on ${PORT}`)