const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const Course = require('../models/courseModel');


// REGISTER
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const admin = new Admin({ name, email, password, role: "admin" });
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JSON_SECRET,
      { expiresIn: "2d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      role: "admin",
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminUser = await Admin.findOne({ email });
    if (!adminUser)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await adminUser.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: adminUser._id, role: "admin" },
      process.env.JSON_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      token,
      role: "admin",
      user: {
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        createdAt: adminUser.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// ADD COURSE
const addCourses = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;

    const course = await Course.create({
      title,
      description,
      price,
      imageUrl,
      admin_id: req.user.id
    });

    res.status(201).json({ success: true, message: 'Course added successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// UPDATE COURSE
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, price, imageUrl } = req.body;

    const course = await Course.findById(courseId);
    if (!course)
      return res.status(404).json({ message: 'Course not found' });

    // PROTECT — ONLY OWNER CAN UPDATE
    if (String(course.admin_id) !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to update this course" });
    }

    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.price = price ?? course.price;
    course.imageUrl = imageUrl ?? course.imageUrl;

    await course.save();

    res.status(200).json({ success: true, message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// DELETE COURSE
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({ message: "Course not found" });

    // ONLY OWNER CAN DELETE
    if (String(course.admin_id) !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to delete this course" });
    }

    await course.deleteOne();

    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


//GET ALL PUBLIC COURSES
const getAllCourse = async (req, res) => {
  try {
    console.log("GET ALL COURSES ROUTE HIT");

    const courses = await Course.find();

    console.log("Courses fetched:", courses);

    res.status(200).json({
      success: true,
      courses,
    });

  } catch (error) {
    console.log("COURSE FETCH ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// GET SINGLE COURSE
const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ADMIN: GET SINGLE COURSE (ONLY OWN COURSE) 
const getAdminSingleCourse = async (req, res) => {
  try {
    const adminId = req.user.id; 
    const courseId = req.params.id;

    const course = await Course.findOne({
      _id: courseId,
      admin_id: adminId
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or not allowed"
      });
    }

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};



module.exports = {
  getSingleCourse,
  registerAdmin,
  loginAdmin,
  addCourses,
  updateCourse,
  getAllCourse,
  deleteCourse,
  getAdminSingleCourse
};
