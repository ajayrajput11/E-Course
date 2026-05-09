const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema(
    {
        courseName: { type: String, required: true },
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Purchase', purchaseSchema)