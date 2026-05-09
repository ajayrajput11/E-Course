const express = require('express');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const {
  registerAdmin,
  loginAdmin,
  addCourses,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
  getAdminSingleCourse 
} = require('../controllers/adminController');

const adminRouter = express.Router();

// AUTH
adminRouter.post('/register', registerAdmin);
adminRouter.post('/login', loginAdmin);

// ADMIN ONLY
adminRouter.post('/addcourse', adminMiddleware, addCourses);
adminRouter.put('/updatecourse/:id', adminMiddleware, updateCourse);
adminRouter.delete('/deletecourse/:id', adminMiddleware, deleteCourse);

// ADMIN ONLY (Dashboard courses list)
adminRouter.get('/courses', adminMiddleware, getAllCourse);

// PUBLIC (admin course details)
adminRouter.get('/course/:id', getSingleCourse);


adminRouter.get('/course/:id', adminMiddleware, getAdminSingleCourse);


module.exports = { adminRouter };
