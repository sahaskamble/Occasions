import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  }
});

const NeedToKnowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

const PolicySchema = new mongoose.Schema({
  point: {
    type: String,
    required: true
  },
})

// Main package schema for mongodb
const PackageSchema = new mongoose.Schema({
  // Category Id
  CategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
  // Package Name
  PackageName: {
    type: String,
    required: true
  },
  // Package Description
  PackageDesc: {
    type: String,
    required: true
  },
  // Package Price
  Price: {
    type: String,
    required: true
  },
  // Discount Package Price
  DiscountPrice: {
    type: String,
    required: true
  },
  // Package Review
  PackageReview: {
    type: String,
    required: true
  },
  // Package Experience
  Experience: {
    type: String,
    required: true
  },
  // Location
  Location: {
    type: String,
    required: true
  },
  // Policy
  Policy: [PolicySchema],
  // Need to know
  NeedToKnow: [NeedToKnowSchema],
  // Package Images
  Images: [ImageSchema]
}, {
  timestamps: true
});

export default mongoose.models.Packages || mongoose.model("Packages", PackageSchema);
