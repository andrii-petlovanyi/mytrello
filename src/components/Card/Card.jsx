import {
  Card as CardChakra,
  CardBody,
  CardFooter,
  Flex,
  IconButton,
  Input,
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

const Card = ({ boardId, card, ...props }) => {
  const { message, updatedAt, updatedBy } = card;

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

      if (error) return toast({ title: error.message, status: 'error' });

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
      if (error) return toast({ title: error.message, status: 'error' });

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
        <CardBody>
          {edit ? (
            <Textarea defaultValue={newMessage} onChange={editHandler} />
          ) : (
            <Text>{message}</Text>
          )}
        </CardBody>
        <CardFooter
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={'0 10px'}
        >
          <Text fontSize={'12px'}>updated: </Text>
          <Flex alignItems={'center'}>
            {edit ? (
              <Flex>
                <IconButton
                  size={'sm'}
                  variant={'addBtn'}
                  icon={<MdOutlineClose />}
                  onClick={() => setEdit(false)}
                />
                <IconButton
                  size={'sm'}
                  variant={'addBtn'}
                  icon={<MdDone />}
                  isLoading={updateLoading}
                  onClick={updateHandler}
                />
              </Flex>
            ) : (
              <IconButton
                size={'sm'}
                variant={'addBtn'}
                icon={<MdOutlineModeEdit />}
                onClick={() => setEdit(true)}
              />
            )}
            <IconButton
              size={'sm'}
              variant={'addBtn'}
              onClick={deleteCardHandler}
              isLoading={deleteLoading}
              icon={<MdOutlineDeleteOutline />}
            />
          </Flex>
        </CardFooter>
      </CardChakra>
    </>
  );
};

export default Card;
