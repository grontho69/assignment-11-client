import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";







const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {

const {user}=useContext(AuthContext)

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken} `
      
      return config
    })

    const resInterceptor = axiosSecure.interceptors.response.use((response) => {
      return response
    },(err) => {
      console.log(err)
      return Promise.reject(err)
    })
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor)
       axiosSecure.interceptors.response.eject(resInterceptor)
}

  }, [user])
  
  return axiosSecure

}

export default useAxiosSecure
