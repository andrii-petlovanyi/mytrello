import { Button, Flex, useToast } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLogOutUserMutation } from '../../redux/users/userApiSlice';
import userSelectors from '../../redux/users/userSelectors';
import { logOut } from '../../redux/users/userSlice';

const Navigation = ({ ...props }) => {
  const toast = useToast();
  const isAuth = useSelector(userSelectors.isAuth);
  const [logOutUser, { isLoading }] = useLogOutUserMutation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const { error } = await logOutUser();
      if (error) {
        return toast({ title: error.message, status: 'error' });
      }
      dispatch(logOut());
      toast({ title: 'You log out successfully!', status: 'success' });
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  return (
    <Flex
      as="nav"
      gap={'10px'}
      display={{ base: 'none', lg: 'flex' }}
      {...props}
    >
      {isAuth ? (
        <>
          <Button
            variant={'mainFormBtn'}
            isLoading={isLoading}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button as={NavLink} to="login" variant={'mainFormBtn'}>
            Login
          </Button>
          <Button as={NavLink} to="register" variant={'mainFormBtn'}>
            Register
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Navigation;
