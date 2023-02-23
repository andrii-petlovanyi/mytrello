import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMoveCardMutation } from './redux/cards/cardsApiSlice';
import listsApiSlice, {
  useGetAllListsQuery,
} from './redux/lists/listsApiSlice';
import { useLogInUserMutation } from './redux/users/userApiSlice';
import { logIn } from './redux/users/userSlice';

const App = () => {
  const [logInUser] = useLogInUserMutation();
  const [moveCard] = useMoveCardMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function login() {
      const user = {
        email: 'pam1@i.ua',
        password: '12344321',
      };
      try {
        const { data, error } = await logInUser(user);
        if (!data) return console.log(error);
        dispatch(logIn(data));
        console.log('login successfully');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { data: res } = useGetAllListsQuery();
  const { lists: boards } = res || [];

  //   const [boards, setBoards] = useState([
  //     {
  //       id: 1,
  //       title: 'one',
  //       cards: [
  //         { id: '1', message: 'hello' },
  //         { id: '2', message: 'hello' },
  //         { id: '3', message: 'hello' },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: 'two',
  //       cards: [
  //         { id: '4', message: 'hello' },
  //         { id: '5', message: 'hello' },
  //         { id: '6', message: 'hello' },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: 'three',
  //       cards: [
  //         { id: '7', message: 'hello' },
  //         { id: '8', message: 'hello' },
  //         { id: '9', message: 'hello' },
  //       ],
  //     },
  //   ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = e => {
    e.preventDefault();
  };
  const dragLeaveHandler = e => {};

  const dragStarHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e, board) => {
    console.log('old', board._id);
  };

  const dropHandler = async (e, board, item) => {
    try {
      const { data } = await moveCard({
        cardId: currentItem._id,
        currentListId: currentBoard._id,
        destListId: board._id,
      });
      dispatch(listsApiSlice.util.invalidateTags(['lists']));
      console.log(data);
    } catch (error) {}
    e.preventDefault();
    console.log('new', board._id);

  return (
    <Flex
      border={'1px solid'}
      borderColor={'gray'}
      padding={'20px'}
      borderRadius={'10px'}
      gap={'20px'}
    >
      {boards?.map(board => (
        <Flex
          onDragOver={e => dragOverHandler(e)}
          onDrop={e => dropHandler(e, board)}
          key={board?._id}
          border={'1px solid'}
          borderColor={'green'}
          padding={'20px'}
          borderRadius={'20px'}
          width={'300px'}
          flexDirection={'column'}
          gap={'10px'}
          className={board.title}
        >
          <Heading fontSize={'20px'}>{board.title}</Heading>
          {board.cards.map(card => (
            <Box
              onDragLeave={e => dragLeaveHandler(e)}
              onDragStart={e => dragStarHandler(e, board, card)}
              onDragEnd={e => dragEndHandler(e, board)}
              draggable={'true'}
              key={card._id}
              borderRadius={'10px'}
              border={'1px solid'}
              borderColor={'red'}
              padding={'20px 30px'}
              cursor={'pointer'}
            >
              <Text>{card.title}</Text>
              <Text>{card.message}</Text>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default App;
