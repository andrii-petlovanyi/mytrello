import { Box } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';

const Layout = () => {
  return (
    <Box maxW={'1280px'} mx={'auto'} padding={{ base: '0 20px', lg: '0 15px' }}>
      <Header />
      <Suspense fallback={false}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default Layout;
