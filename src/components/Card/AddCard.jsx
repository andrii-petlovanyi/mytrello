import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import { useAddCardMutation } from '../../redux/cards/cardsApiSlice';
import listsApiSlice from '../../redux/lists/listsApiSlice';

const schema = yup.object().shape({
  message: yup
    .string()
    .trim()
    .min(2, 'Minimal message length is 2 symbols')
    .max(320, 'Max message length is 320 symbols')
    .required('Message is required'),
});

const AddCard = ({ boardId }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { onClose, isOpen, onOpen } = useDisclosure();

  const [addCard, { isLoading }] = useAddCardMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ message }) => {
    try {
      const { data, error } = await addCard({ message, listId: boardId });
      if (error) return toast({ title: error.data.message, status: 'error' });

      dispatch(listsApiSlice.util.invalidateTags(['lists']));

      toast({ title: data.message, status: 'success' });
      reset();
      onClose();
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  return (
    <Popover placement="top" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          variant={'addCard'}
          display={'flex'}
          size={'sm'}
          gap={'10px'}
          aria-label={'Open popup add new card'}
        >
          <FiPlus />
          Add new card
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Add card</PopoverHeader>
        <PopoverBody>
          <Box
            as={'form'}
            onSubmit={handleSubmit(onSubmit)}
            display={'flex'}
            flexDirection={'column'}
            gap={'10px'}
          >
            <FormControl isInvalid={errors.message}>
              <Textarea
                type="text"
                variant={'main'}
                placeholder={'Please type something'}
                {...register('message')}
              />
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            </FormControl>
            <Button
              size={'sm'}
              variant={'mainFormBtn'}
              type={'submit'}
              isLoading={isLoading}
              aria-label={'Submit card'}
            >
              Save
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddCard;
