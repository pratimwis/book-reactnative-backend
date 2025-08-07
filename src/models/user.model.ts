import mongoose from 'mongoose';

export interface UserDocument extends Document {
  fname: string;
  lname: string;
  password: string;
  email: string;
  profilePicture?: string;
}
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userType:{
      type: String,
      enum: ['buyer', 'seller'],
      default: 'buyer',
    },
    profilePicture: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);

export default User;
