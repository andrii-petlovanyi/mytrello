import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FiMenu } from 'react-icons/fi';

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
          <DrawerCloseButton variant={'mainFormBtn'} />

          <DrawerBody bg={'main'}></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
