import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/users/userApiSlice';
import userSelectors from '../../redux/users/userSelectors';

function PrivateRoute() {
  const isAuth = useSelector(userSelectors.isAuth);
  const location = useLocation();
  Cookies.set('privateRoute', location.pathname, { expires: 7 });
  const { isLoading } = useGetUserQuery();

  if (isAuth && !isLoading) return <Outlet />;

  if (!isAuth && !isLoading) return <Navigate to="login" />;
}

export default PrivateRoute;
