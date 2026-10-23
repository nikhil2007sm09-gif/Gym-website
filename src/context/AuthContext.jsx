import { createContext, useContext, useState, useEffect } from "react";
import api from "../API/axios";
import { getUserProfileApi, logoutApi, updateUserProfileApi } from "../API/userApi";
import { clearAddressCache } from "../API/addressApi";
import { clearOrdersCache, addToCartApi } from "../API/cartApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfileApi();
      if (data && data.success) {
        setUser(data.user || data.data || data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const checkUser = async (userName) => {
    try {
      setLoading(true);

      const res = await api.post("/user/checkUser", {
        userName,
      });

      return res.data;
    } catch (error) {
      console.error("Check user error:", error.response?.data);
      return { success: false, message: "Unable to check user" };
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data) => {
    try {
      setLoading(true);

      const res = await api.post("/user/loginUser", data);
      
      if (res.data?.success) {
        await fetchUserProfile();
        
       
        const guestCartStr = localStorage.getItem('guestCart');
        if (guestCartStr) {
          const guestCart = JSON.parse(guestCartStr);
          if (Array.isArray(guestCart) && guestCart.length > 0) {
            try {
              for (const item of guestCart) {
                await addToCartApi(item.productId, {
                  color: item.color,
                  size: item.size,
                  quantity: item.quantity
                });
              }
              localStorage.removeItem('guestCart');
              window.dispatchEvent(new Event('cart-updated'));
            } catch (err) {
              console.error("Failed to sync guest cart", err);
            }
          }
        }
      }

      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return { success: false, message: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data) => {
    try {
      setLoading(true);

      const res = await api.post("/user/registeruser", data);

      return res.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      return { success: false, message: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      clearAddressCache();
      clearOrdersCache();
      localStorage.removeItem("username");
    }
  };

  const updateUser = async (data) => {
    try {
      setLoading(true);
      const res = await updateUserProfileApi(data);
      if (res && res.success) {
        await fetchUserProfile();
      }
      return res;
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, message: "Profile update failed" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkUser,
        loginUser,
        registerUser,
        logoutUser,
        fetchUserProfile,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
