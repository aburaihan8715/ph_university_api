import fs from 'fs';

export const deleteImageFile = async (path: string) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File is deleted.');
    }
  });
};
