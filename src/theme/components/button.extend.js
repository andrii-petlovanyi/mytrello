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
  border: '2px solid',
  borderColor: 'accent',
  borderRadius: '5px',
  padding: '2px 2px',

  _hover: {
    backgroundColor: 'accentHover',
  },
});

const close = defineStyle({
  color: 'red',
  fontSize: '20px',

  _hover: {
    color: 'red.300',
  },
});

const save = defineStyle({
  color: 'green',
  fontSize: '20px',

  _hover: {
    color: 'green.300',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: {
    mainFormBtn,
    addBtn,
    addCard,
    addBoard,
    close,
    save,
  },
});
