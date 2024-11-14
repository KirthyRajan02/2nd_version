import mongoose from 'mongoose';

const tourismSchema = new mongoose.Schema({
  country: String,
  batch: String,
  stage: String,
  program: String,
  activeParticipants: Number,
  overallProgress: Number,
  stageDistribution: [{
    name: String,
    value: Number,
    status: String,
    progress: Number,
    participants: Number,
    training: Number,
    workshops: Number,
    completion: Number,
    stage1: Number,
    stage2: Number,
    stage3: Number,
    stage4: Number,
    totalProgress: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const TourismData = mongoose.models.TourismData || mongoose.model('TourismData', tourismSchema); 