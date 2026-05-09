const express = require('express')
const userRouter = express.Router()
const { userMiddleware } = require('../middlewares/userMiddleware')
const { registerUser, loginUser, purchaseCourse } = require('../controllers/userController')

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/purchasecourse', userMiddleware, purchaseCourse)

module.exports = { userRouter }
