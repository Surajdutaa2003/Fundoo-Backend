import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    otp: { 
      type: String, 
      default: null 
    } // ✅ Added OTP field
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
