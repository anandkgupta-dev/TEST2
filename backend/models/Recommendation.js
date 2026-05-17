const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  whySuitable: String,
});

const LearningPathSchema = new mongoose.Schema({
  title: String,
  steps: [String],
  whySuitable: String,
});

const CertificationSchema = new mongoose.Schema({
  title: String,
  provider: String,
  whySuitable: String,
});

const RecommendationSchema = new mongoose.Schema({
  skills: String,
  interests: String,
  careerGoal: String,
  courses: [CourseSchema],
  learningPaths: [LearningPathSchema],
  certifications: [CertificationSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
