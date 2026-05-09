const Course = require('../models/courseModel')

const previewCourse = async (req, res) => {
  try {
    const courses = await Course.find({})
    res.status(200).json({ courses })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { previewCourse }
