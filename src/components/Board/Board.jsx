import { Divider, Flex, Heading, IconButton, useToast } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import AddCard from '../Card/AddCard';
import { useDeleteListMutation } from '../../redux/lists/listsApiSlice';

const Board = ({ board, children, ...props }) => {
  const toast = useToast();

  const [deleteList, { isLoading }] = useDeleteListMutation();

  const deleteBoardHandler = async () => {
    try {
      const { data, error } = await deleteList(board._id);
      if (error) return toast({ title: error.data.message, status: 'error' });
      toast({ title: data.message, status: 'success' });
      console.log('error', error);
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  const isEmpty = !!(board?.cards?.length === 0);

  return (
    <>
      <Flex
        border={'1px solid'}
        borderColor={'accent'}
        p={'10px'}
        borderRadius={'10px'}
        minW={'250px'}
        height={'auto'}
        width={{ base: '250px', lg: '350px', xl: '400px' }}
        flexDirection={'column'}
        justifyContent={'space-between'}
        gap={'10px'}
        {...props}
      >
        <Flex flexDirection={'column'}>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            minH={'40px'}
          >
            <Heading wordBreak={'break-word'} fontSize={'20px'}>
              {board?.title}
            </Heading>
            {isEmpty && (
              <IconButton
                variant={'addBtn'}
                aria-label={'Delete board'}
                onClick={deleteBoardHandler}
                isLoading={isLoading}
                icon={<MdOutlineDeleteOutline />}
              />
            )}
          </Flex>
          <Divider
            mx={'auto'}
            maxW={'90%'}
            borderColor={'accent'}
            opacity={'0.3'}
          />
          <Flex pt={'20px'} gap={'20px'} flexDirection={'column'}>
            {children}
          </Flex>
        </Flex>
        <AddCard boardId={board._id} />
      </Flex>
    </>
  );
};

export default Board;
