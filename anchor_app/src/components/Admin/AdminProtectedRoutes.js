import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRoutes = () => {
  const isAuthenticatedAdmin = localStorage.getItem('isAuthenticatedAdmin')
return (
    isAuthenticatedAdmin ? <Outlet/> : <Navigate to='/admin/login'/>
  )
}

export default AdminProtectedRoutes