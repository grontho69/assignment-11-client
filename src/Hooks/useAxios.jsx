
import axios from 'axios';




const axiosPublic = axios.create({
  baseURL: 'https://blood-connect-server-peach.vercel.app/',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

const useAxios = () => {
  return axiosPublic
}



export default useAxios