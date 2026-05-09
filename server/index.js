
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const {connectDb} = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()



const {userRouter} = require('./routes/userRoutes')

const {adminRouter} = require('./routes/adminRoutes')
const {courseRouter} = require('./routes/courseRoutes')



app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json())


app.use("/api/users",userRouter)

app.use("/api/admin",adminRouter)

app.use("/api",courseRouter)


connectDb()


app.get('/',(req,res)=>{
    res.send("Welcome to Course Selling Application")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})