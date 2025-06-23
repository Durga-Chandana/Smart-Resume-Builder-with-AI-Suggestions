const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  summary: String,
  experience: String,
  education: String,
  skills: String,
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);

