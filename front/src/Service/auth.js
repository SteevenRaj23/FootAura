import axios from "axios"


export async function registerUser(userData){
   try{
     const response  = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
     return response.data;
   } catch(error){
        throw error;
   } 
}


export async function loginUser(userData){
   try{
     const response  = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData);
     return response.data;
   } catch(error){
        throw error;
   } 
}