import api from "../utils/api";

// get random images (Landing page)
export const getRandomImages = async () => {
  const res = await api.get("/images/random");
  return res.data;
};

// get logged-in user's images (Dashboard)
export const getMyImages = async () => {
  const res = await api.get("/images/my");
  return res.data;
};

// upload image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/images/upload", formData);
  return res.data;
};

// delete image
export const deleteImage = async (id) => {
  return await api.delete(`/images/${id}`);
};

// get public user images
export const getUserImages = async (username) => {
  const res = await api.get(`/images/user/${username}`);
  return res.data;
};
