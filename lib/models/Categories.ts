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

const CategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    unique: true
  },
  Description: {
    type: String,
    required: false
  },
  Image: {
    type: [ImageSchema],
    required: false
  }
}, {
  timestamps: true
});

// Check if the model exists before creating a new one
export default mongoose.models.Categories || mongoose.model('Categories', CategorySchema);
