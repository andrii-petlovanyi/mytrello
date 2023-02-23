import { Flex, IconButton, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddBoard from '../components/Board/AddBoard';
import Board from '../components/Board/Board';
import Card from '../components/Card/Card';
import { useMoveCardMutation } from '../redux/cards/cardsApiSlice';
import listsApiSlice, {
  useGetAllListsQuery,
} from '../redux/lists/listsApiSlice';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';

const Dashboard = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [moveCard] = useMoveCardMutation();
  const [sortBy, setSortBy] = useState('asc');

  const { data: res } = useGetAllListsQuery(sortBy);
  const { lists: boards } = res || [];

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [opacity, setOpacity] = useState(1);

  const sortHandler = () => {
    if (sortBy == 'asc') {
      setSortBy('desc');
    } else {
      setSortBy('asc');
    }
  };

  const dragOverContainerHandler = e => {
    const container = e.target;
    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const scrollSpeed = 20;
    if (x > containerRect.width - 250) {
      container.scrollLeft += scrollSpeed;
    } else if (x < 250) {
      container.scrollLeft -= scrollSpeed;
    }
  };

  const dragOverHandler = e => {
    e.preventDefault();
  };

  const dragLeaveHandler = e => {};

  const dragStarHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
    setOpacity(0.6);

    e.currentTarget.classList.add('dragging');
  };

  const dragEndHandler = (e, board) => {
    setOpacity(1);
  };

  const dropHandler = async (e, board, item) => {
    e.preventDefault();
    try {
      await moveCard({
        cardId: currentItem._id,
        currentListId: currentBoard._id,
        destListId: board._id,
      });
      dispatch(listsApiSlice.util.invalidateTags(['lists']));
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  return (
    <>
      <Flex justifyContent={'space-between'} mt={'10px'}>
        <AddBoard />
        <IconButton
          size={'sm'}
          variant={'addBoard'}
          onClick={() => sortHandler()}
          aria-label={'Sort card by date'}
          icon={sortBy == 'asc' ? <BsSortDownAlt /> : <BsSortDown />}
        />
      </Flex>
      <Flex
        overflowX={'scroll'}
        padding={'20px 0'}
        gap={'20px'}
        minH={'calc(100vh - 100px)'}
        alignItems={'flex-start'}
        onDragOver={e => dragOverContainerHandler(e)}
      >
        {boards?.map(board => (
          <Board
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, board)}
            key={board?._id}
            board={board}
          >
            {board.cards.map(card => (
              <Card
                onDragLeave={e => dragLeaveHandler(e)}
                onDragStart={e => dragStarHandler(e, board, card)}
                onDragEnd={e => dragEndHandler(e, board)}
                key={card?._id}
                card={card}
                boardId={board._id}
                opacity={card?._id == currentItem?._id ? opacity : 1}
              />
            ))}
          </Board>
        ))}
      </Flex>
    </>
  );
};

export default Dashboard;
