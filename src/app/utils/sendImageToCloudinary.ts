import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
import { deleteImageFile } from './deleteImageFile';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // delete a file asynchronously
    await deleteImageFile(path);
    // fs.unlink(path, (err) => {
    //   if (err) {
    //     console.error('Error deleting file:', err);
    //   } else {
    //     console.log('File is deleted.');
    //   }
    // });

    return uploadResult;
  } catch (error) {
    await deleteImageFile(path);
    // fs.unlink(path, (err) => {
    //   if (err) {
    //     console.error('Error deleting file:', err);
    //   } else {
    //     console.log('File is deleted.');
    //   }
    // });
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
