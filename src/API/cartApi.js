import api from "./axios";
export const getCartApi = async () => {
  const res = await api.get("/cart/getCart");
  return res.data;
};

export const addToCartApi = async (productId, payload) => {
  const res = await api.post(`/cart/addProductInCart/${productId}`, payload);
  return res.data;
};

export const removeCartItemApi = async (productId, color, size, quantity) => {
  const res = await api.put(`/cart/removeProductFromCart/${productId}`, {
    color,
    size,
    quantity
  });
  return res.data;
};

let ordersCache = null;

export const clearOrdersCache = () => {
  ordersCache = null;
};

export const getOrderbyUserApi = async (forceUpdate = false) => {
  if (ordersCache && !forceUpdate) return ordersCache;
  const res = await api.get("/cart/getOrderbyUser");
  ordersCache = res.data;
  return res.data;
};

export const createOrderApi = async (data) => {
  const res = await api.post("/cart/createOrder", data);
  clearOrdersCache();
  return res.data;
};
