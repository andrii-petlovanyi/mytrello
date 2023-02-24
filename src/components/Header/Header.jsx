import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

const Header = () => {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={{ base: '10px 0', lg: '10px 0' }}
    >
      <Text fontWeight={'600'} fontSize={'22px'}>
        my
        <Box
          as={'span'}
          fontSize={'24px'}
          fontWeight={'800'}
          letterSpacing={'0.04em'}
          color={'logo'}
        >
          Trello
        </Box>
      </Text>
      <Flex gap={{ lg: '30px' }}>
        <UserProfile display={{ base: 'none', lg: 'flex' }} />
        <Navigation />
        <MobileMenu />
      </Flex>
    </Flex>
  );
};

export default Header;
