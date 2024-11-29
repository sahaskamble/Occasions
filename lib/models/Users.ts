import mongoose from "mongoose";

const Users = new mongoose.Schema({
  // Important for customer side login
  ContactNum: { type: Number, unique: true, required: true },
  // Used for intreaction but not for login 
  Username: { type: String, unique: true, required: true },
  // Used for advertising
  Email: { type: String, unique: true, required: true },
  // Hashed Password
  HashedPass: { type: String, required: true },
  // Salt for hash
  SaltPass: { type: String, required: true },
  // User Type
  Type: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Users || mongoose.model('Users', Users);

