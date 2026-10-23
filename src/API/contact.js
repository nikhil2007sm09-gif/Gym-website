import api from "./axios";

export const createQuery = async (data) => {
  const res = await api.post("/query/createQuery", data);
  return res.data;
};
