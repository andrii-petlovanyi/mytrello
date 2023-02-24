import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import userSelectors from '../../redux/users/userSelectors';

const UserProfile = ({ ...props }) => {
  const userName = useSelector(userSelectors.userName);
  const isAuth = useSelector(userSelectors.isAuth);

  return (
    isAuth && (
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        gap={'10px'}
        {...props}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'full'}
          width={'35px'}
          height={'35px'}
          bg={'accent'}
          color={'white'}
          fontSize={'14px'}
          fontWeight={'600'}
        >
          {userName?.slice(0, 2) ?? 'Ad'}
        </Box>
        <Text
          whiteSpace={'nowrap'}
          fontSize={'17px'}
          letterSpacing={'-0.04em'}
          fontWeight={'500'}
        >{`Hello, ${userName ?? 'admin'}`}</Text>
      </Flex>
    )
  );
};

export default UserProfile;
