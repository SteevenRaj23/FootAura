export const getIdToken = () => {
    const token = localStorage.getItem("userToken");
    return token
} 