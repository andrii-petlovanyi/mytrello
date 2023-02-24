import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/users/userApiSlice';
import userSelectors from '../../redux/users/userSelectors';

const PrivateRoute = () => {
  const isAuth = useSelector(userSelectors.isAuth);
  const { isLoading } = useGetUserQuery();

  if (isAuth && !isLoading) return <Outlet />;

  if (!isAuth && !isLoading) return <Navigate to="/login" />;
};

export default PrivateRoute;
