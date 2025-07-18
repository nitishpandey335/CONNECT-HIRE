const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  location: { type: String },
  salary: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', JobSchema);