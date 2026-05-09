const express = require("express");
const { getAllCourse, getSingleCourse } = require("../controllers/adminController");

const courseRouter = express.Router();

// PUBLIC ROUTES FOR USERS
courseRouter.get("/courses", getAllCourse);
courseRouter.get("/course/:id", getSingleCourse);

module.exports =  courseRouter ;
