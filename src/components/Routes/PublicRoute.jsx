import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/users/userApiSlice';
import userSelectors from '../../redux/users/userSelectors';

function PublicRoute() {
  const isAuth = useSelector(userSelectors.isAuth);
  const path = Cookies.get('privateRoute');
  const { isLoading } = useGetUserQuery();

  if (!isAuth && !isLoading) return <Outlet />;

  if (isAuth && !isLoading) return <Navigate to={path ? path : '/'} />;
}

export default PublicRoute;
