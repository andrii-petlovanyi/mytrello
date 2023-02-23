import { Flex } from '@chakra-ui/react';
import React from 'react';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';

export const Header = () => {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={{ base: '10px 0', lg: '10px 0' }}
    >
      MyTrello
      <Navigation />
      <MobileMenu />
    </Flex>
  );
};
