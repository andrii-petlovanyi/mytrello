import {
  Badge,
  Box,
  Card as CardChakra,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  IconButton,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  MdDone,
  MdOutlineClose,
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '../../redux/cards/cardsApiSlice';
import listsApiSlice from '../../redux/lists/listsApiSlice';
import { formatTime } from '../../helpers/formatTime';

const Card = ({ boardId, card, ...props }) => {
  const { message, updatedAt } = card;

  const [edit, setEdit] = useState(false);
  const [newMessage, setNewMessage] = useState(message);

  const dispatch = useDispatch();
  const toast = useToast();
  const [deleteCard, { isLoading: deleteLoading }] = useDeleteCardMutation();
  const [updateCard, { isLoading: updateLoading }] = useUpdateCardMutation();

  const deleteCardHandler = async () => {
    try {
      const { data, error } = await deleteCard({
        listId: boardId,
        cardId: card._id,
      });

      if (error) return toast({ title: error.data.message, status: 'error' });

      dispatch(listsApiSlice.util.invalidateTags(['lists']));
      toast({ title: data.message, status: 'success' });
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  const updateHandler = async () => {
    if (newMessage?.length < 3)
      return toast({
        title: 'Minimal message length is 3 symbols',
        status: 'error',
      });

    try {
      const { data, error } = await updateCard({
        cardId: card._id,
        card: { message: newMessage },
      });
      if (error) return toast({ title: error.data.message, status: 'error' });

      dispatch(listsApiSlice.util.invalidateTags(['lists']));
      toast({ title: data.message, status: 'success' });
      setEdit(false);
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  const editHandler = async e => {
    const message = e.target.value;
    setNewMessage(message);
  };

  return (
    <>
      <CardChakra
        draggable={edit ? 'false' : 'true'}
        width={'100%'}
        cursor={'pointer'}
        {...props}
      >
        <CardBody padding={'10px'} minH={'70px'}>
          {edit ? (
            <Textarea
              defaultValue={newMessage}
              variant={'main'}
              onChange={editHandler}
            />
          ) : (
            <Text>{message}</Text>
          )}
        </CardBody>
        <Divider width={'90%'} mb={'5px'} mx={'auto'} opacity={'0.2'} />
        <CardFooter
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={'0 10px'}
        >
          <Box fontSize={'12px'} fontWeight={'600'}>
            upd:{' '}
            <Badge
              fontSize={'10px'}
              textTransform={'lowercase'}
              borderRadius={'3px'}
              colorScheme={'gray'}
            >
              {formatTime(updatedAt)}
            </Badge>
          </Box>
          <Flex alignItems={'center'}>
            {edit ? (
              <Flex>
                <IconButton
                  size={'sm'}
                  variant={'close'}
                  icon={<MdOutlineClose />}
                  onClick={() => setEdit(false)}
                  aria-label={'Close editor'}
                />
                <IconButton
                  size={'sm'}
                  variant={'save'}
                  icon={<MdDone />}
                  isLoading={updateLoading}
                  onClick={updateHandler}
                  aria-label={'Submit form update card'}
                />
              </Flex>
            ) : (
              <IconButton
                size={'sm'}
                variant={'addBtn'}
                icon={<MdOutlineModeEdit />}
                aria-label={'Open editor card'}
                onClick={() => setEdit(true)}
              />
            )}
            <IconButton
              size={'sm'}
              variant={'addBtn'}
              onClick={deleteCardHandler}
              isLoading={deleteLoading}
              icon={<MdOutlineDeleteOutline />}
              aria-label={'Delete card'}
            />
          </Flex>
        </CardFooter>
      </CardChakra>
    </>
  );
};

export default Card;
