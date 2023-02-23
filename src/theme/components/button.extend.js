import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const mainFormBtn = defineStyle({
  color: '#ffffff',
  backgroundColor: 'accent',

  _hover: {
    backgroundColor: 'accentHover',
  },
});

const addBtn = defineStyle({
  color: 'accent',
  fontSize: '20px',

  _hover: {
    color: 'accentHover',
  },
});

const addCard = defineStyle({
  color: 'accent',
  fontSize: '20px',
  border: '1px solid',
  fontSize: '16px',
  padding: '5px 5px',

  _hover: {
    color: 'accentHover',
  },
});

const addBoard = defineStyle({
  backgroundColor: 'accent',
  color: 'white',
  fontSize: '20px',
  fontSize: '18px',
  borderRadius: 'full',
  padding: '5px 5px',

  _hover: {
    backgroundColor: 'accentHover',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: {
    mainFormBtn,
    addBtn,
    addCard,
    addBoard,
  },
});
