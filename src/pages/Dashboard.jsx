import { Flex, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import Board from '../components/Board/Board';
import Card from '../components/Card/Card';
import { useMoveCardMutation } from '../redux/cards/cardsApiSlice';
import listsApiSlice, {
  useGetAllListsQuery,
} from '../redux/lists/listsApiSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [moveCard] = useMoveCardMutation();

  const { data: res } = useGetAllListsQuery();
  const { lists: boards } = res || [];

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [opacity, setOpacity] = useState(1);

  const dragOverHandler = e => {
    e.preventDefault();
  };
  const dragLeaveHandler = e => {};

  const dragStarHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
    setOpacity(0.3);
  };

  const dragEndHandler = (e, board) => {
    console.log('old', board._id);
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
      console.log(error);
    }
    console.log('new', board?._id);
  };

  return (
    <>
      <Flex>
        <IconButton
          variant={'addBoard'}
          aria-label={'Add board'}
          icon={<FiPlus />}
        />
      </Flex>
      <Flex overflowX={'scroll'} padding={'20px'} gap={'20px'}>
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
