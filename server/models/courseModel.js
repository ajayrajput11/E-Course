const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0 },
  imageUrl: { type: String, default: "" },

  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
