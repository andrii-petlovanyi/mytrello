import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { useGetUserQuery } from './redux/users/userApiSlice';
import userSelectors from './redux/users/userSelectors';
import { refresh } from './redux/users/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(userSelectors.getToken);
  const { data, isLoading } = useGetUserQuery(token, {
    skip: token === null,
  });

  useEffect(() => {
    if (!data) return;

    dispatch(refresh(data));
  }, [data]);

  return (
    <>
      {!isLoading && (
        <Suspense fallback={false}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
                {/* <Route path="*" element={<NotFound />} /> */}
              </Route>
              <Route element={<PublicRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default App;
