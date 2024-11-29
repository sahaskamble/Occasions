import mongoose from "mongoose";

const PointsSchema = new mongoose.Schema({
  IconName: { type: String },
  Point: { type: String, required: true },
})

const InclusionSchema = new mongoose.Schema({
  // Package Reference
  PackageId: [{
    type: mongoose.Types.ObjectId,
    ref: 'Packages',
    required: true
  }],
  // Inclusion Points
  Points: [PointsSchema],
}, { timestamps: true });

export default mongoose.models.Inclusions || mongoose.model('Inclusions', InclusionSchema); 
