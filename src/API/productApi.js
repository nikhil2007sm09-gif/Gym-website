import api from "./axios";

export const getAllProductsApi = async (filters = {}) => {
  try {
    const queryParams = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== false
      )
    );

    const res = await api.get("/product/getAllProduct", {
      params: queryParams,
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const getAllCategories = async () => {
  const res = await api.get("/category/getAllCategories");
  return res.data;
};
