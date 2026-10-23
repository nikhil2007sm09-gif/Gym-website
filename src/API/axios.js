import axios from "axios";

const baseUrl = "https://apikapde.innovizetechsolution.com/api";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {    
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error?.response?.data?.error;
    
    if (status === 401) {
      if (window.location.pathname !== '/') {
        // window.location.replace('/'); dont use not required here...
      }
    }
    if (status === 500 || (status === 404 && !message)) {
      const errorPath = "/error"
      window.location.replace(errorPath);
    }
    return Promise.reject(error);
  }
);

export default api;
