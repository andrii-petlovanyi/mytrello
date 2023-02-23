import { Flex, Heading, IconButton } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import AddCard from './AddCard';

const Board = ({ board, children, ...props }) => {
  const dispatch = useDispatch();

  const isEmpty = !!(board?.cards?.length === 0);

  return (
    <>
      <Flex
        border={'1px solid'}
        borderColor={'accent'}
        p={'10px 20px'}
        borderRadius={'10px'}
        minW={'280px'}
        width={{ base: '280px', lg: '350px', xl: '400px' }}
        flexDirection={'column'}
        justifyContent={'space-between'}
        gap={'10px'}
        {...props}
      >
        <Flex flexDirection={'column'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading fontSize={'20px'}>{board.title}</Heading>
            <Flex gap={'5px'}>
              {isEmpty && (
                <IconButton
                  variant={'addBtn'}
                  aria-label={'Delete board'}
                  icon={<MdOutlineDeleteOutline />}
                />
              )}
              <IconButton
                variant={'addBtn'}
                aria-label={'Sort card by date'}
                icon={true ? <BsSortDownAlt /> : <BsSortDown />}
              />
            </Flex>
          </Flex>
          <Flex pt={'30px'} gap={'20px'} flexDirection={'column'}>
            {children}
          </Flex>
        </Flex>
        <AddCard boardId={board._id} />
      </Flex>
    </>
  );
};

export default Board;

Board.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
};
