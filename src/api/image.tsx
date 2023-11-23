import axios from 'axios';

const apiUploadImages = (images) => {
  return axios.post(
    `https://api.cloudinary.com/v1_1/${
      // @ts-ignore
      import.meta.env.VITE_CLOUD_NAME
    }/auto/upload`,
    images,
  );
};
export default apiUploadImages;
