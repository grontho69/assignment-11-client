
import axios from 'axios';




const axiosInstance = axios.create({
  baseURL: 'https://blood-donation-backend-phi.vercel.app',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

const useAxios = () => {
  return axiosInstance
}



export default useAxios