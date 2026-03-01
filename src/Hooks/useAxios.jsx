
import axios from 'axios';




const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-pi-peach.vercel.app/',
  timeout: 10000,
});

const useAxios = () => {
  return axiosPublic
}



export default useAxios