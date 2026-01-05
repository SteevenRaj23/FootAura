import axios from "axios";
import { getIdToken } from "./generalService.js";

export const getShoesData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching shoes data:", error);
    throw error;
  }
};



export const getShoesById = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching shoes data:", error);
    throw error;
  }
};