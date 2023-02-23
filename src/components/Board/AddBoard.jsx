import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useAddNewListMutation } from '../../redux/lists/listsApiSlice';

const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(2, 'Minimal title length is 3 symbols')
    .max(64, 'Maximal title length is 64 symbols')
    .required('Title is required'),
});

const AddBoard = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const toast = useToast();

  const [addNewList, { isLoading }] = useAddNewListMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ title }) => {
    try {
      const { data, error } = await addNewList({ title });
      if (error) return toast({ title: error.data.message, status: 'error' });

      toast({ title: data.message, status: 'success' });
      reset();
      onClose();
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  return (
    <>
      <Popover
        placement="right"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <IconButton
            size={'sm'}
            variant={'addBoard'}
            aria-label={'Add board'}
            icon={<FiPlus />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Add board</PopoverHeader>
          <PopoverBody>
            <Box
              as={'form'}
              onSubmit={handleSubmit(onSubmit)}
              display={'flex'}
              gap={'10px'}
            >
              <FormControl isInvalid={errors.title}>
                <Input
                  type="text"
                  size={'sm'}
                  variant={'mainAuthForm'}
                  placeholder={'Please set title'}
                  {...register('title')}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <Button
                size={'sm'}
                variant={'mainFormBtn'}
                type={'submit'}
                isLoading={isLoading}
              >
                Add
              </Button>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddBoard;
