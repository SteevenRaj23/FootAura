import axios from "axios";
import { getIdToken } from "./generalService.js";

export const getCartData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${getIdToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching cart data:", error);
    throw error;
  }
};

export const addToCart = async (Id, size, quantity) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/cart/add`,
      {
        productId: Id,
        size: size,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${getIdToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching cart data:", error);
    throw error;
  }
};

export const removeFromCart = async (productId, size, quantity) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/cart/remove`,
      {
        data:{
        productId,
        size,
        quantity,
      },
        headers: {
          Authorization: `Bearer ${getIdToken()}`,
        },
      }
     );
    return response.data;
  } catch (error) {
    throw error;
  }
};
