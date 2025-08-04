import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOULDINARY_CLOUD_NAME,
  api_key: process.env.CLOULDINARY_API_KEY,
  api_secret: process.env.CLOULDINARY_API_SECRET,
});
export default cloudinary;
