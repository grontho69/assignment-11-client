import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router'
import { ThreeCircles } from 'react-loader-spinner'

const PrivateRoute = ({children}) => {

  const {user,loading}=useContext(AuthContext)


  if (loading) {
    return <div className='h-[97vh] flex items-center justify-center'>
      <ThreeCircles
visible={true}
height="100"
width="100"
color="#FF0000
"
ariaLabel="three-circles-loading"
wrapperStyle={{}}
wrapperClass=""
/>
    </div>
  }
  if (!user) {
    return<Navigate to={'/login'}></Navigate>
  }

return children
  
}

export default PrivateRoute
