const mongoose = require('mongoose');

const JobSeekerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{ type: String }],
  resume: { type: String },
  bio: { type: String },
});

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);