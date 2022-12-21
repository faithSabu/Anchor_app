import { Navigate, Outlet } from 'react-router-dom'

const ProtectecdRoutes = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectecdRoutes