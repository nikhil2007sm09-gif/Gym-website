import api from "./axios";

let addressCache = null;

export const clearAddressCache = () => {
  addressCache = null;
};

export const getAddressApi = async (forceUpdate = false) => {
  if (addressCache && !forceUpdate) return addressCache;
  const res = await api.get("/cart/getAllAddressesUser");
  addressCache = res.data;
  return res.data;
};

export const createAddressApi = async (data) => {
  const res = await api.post("/cart/createAddress", data);
  addressCache = null; 
  return res.data;
};

export const updateAddressApi = async (id, data) => {
  const res = await api.patch(`/cart/updateAddress/${id}`, data);
  addressCache = null;
  return res.data;
};

export const deleteAddressApi = async (id) => {
  const res = await api.delete(`/cart/deleteAddress/${id}`);
  addressCache = null; 
  return res.data;
};
