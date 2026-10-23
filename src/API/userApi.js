import api from "./axios";

export const getUserProfileApi = async () => {
  const res = await api.get("/user/getUserProfile");
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/user/logoutUser");
  return res.data;
};

export const updateUserProfileApi = async (data) => {
  const res = await api.patch("/user/updateUserProfile", data);
  return res.data;
};

export const changeUserPasswordApi = async (data) => {
  const res = await api.post("/user/changeUserPassword", data);
  return res.data;
};
