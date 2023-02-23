import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  IconButton,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { BiHide, BiShow } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/users/userApiSlice';
import { useDispatch } from 'react-redux';
import { register as registerAction } from '../redux/users/userSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'Minimal name length is 3 symbols')
    .max(32, 'Max name length is 32 symbols')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Email must be in format: email@domain.com')
    .min(6, 'Minimal email length is 6 symbols')
    .max(32, 'Max email length is 32 symbols')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(8, 'Minimal password length is 8 symbols')
    .max(32, 'Max password length is 32 symbols')
    .required('Password is required'),
});

const Register = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async credentials => {
    console.log(credentials);
    try {
      const { data, error } = await registerUser(credentials);
      if (error) return toast({ title: error.message, status: 'error' });
      dispatch(registerAction(data.user));
      toast({ title: data.message, status: 'success' });
      reset();
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width={'100%'} maxW={'md'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up in system</Heading>
        </Stack>
        <Box
          as={'form'}
          onSubmit={handleSubmit(onSubmit)}
          rounded={'lg'}
          bg={'box'}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                variant={'mainAuthForm'}
                placeholder={'Please type your name'}
                {...register('name')}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                variant={'mainAuthForm'}
                placeholder={'Please type email'}
                {...register('email')}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  variant={'mainAuthForm'}
                  placeholder={'Please type password'}
                  {...register('password')}
                />
                <InputRightElement>
                  <IconButton
                    size={'md'}
                    variant={'ghostIB'}
                    icon={show ? <BiShow /> : <BiHide />}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Stack spacing={3}>
              <Button
                mt={'10px'}
                type={'submit'}
                isLoading={isLoading}
                variant={'mainFormBtn'}
              >
                Register
              </Button>
              <Text
                fontSize={'14px'}
                display={'flex'}
                gap={'5px'}
                justifyContent={'center'}
              >
                Already registered?
                <Link color={'accent'} as={NavLink} to={'/login'}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
