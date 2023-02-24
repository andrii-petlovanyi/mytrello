import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

const MobileMenu = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        display={{ base: 'flex', lg: 'none' }}
        variant={'mainFormBtn'}
        icon={<FiMenu />}
        aria-label={'Open mobile menu'}
        {...props}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'xl'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            variant={'mainFormBtn'}
            aria-label={'Close mobile menu'}
          />

          <DrawerBody
            as={Flex}
            bg={'main'}
            alignItems={'center'}
            flexDirection={'column'}
            justifyContent={'center'}
            gap={'30px'}
          >
            <UserProfile />
            <Divider />

            <Navigation
              display={{ base: 'flex', lg: 'none' }}
              justifyContent={'center'}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
