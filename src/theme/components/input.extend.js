import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const mainAuthForm = defineStyle({
  field: {
    color: 'textColor',
    backgroundColor: 'RGBA(255, 255, 255, 0.64)',
    border: '2px solid',
    borderColor: 'gray',

    _hover: {
      borderColor: 'accent',
    },

    _focus: {
      borderColor: 'purple.700',
    },

    _placeholder: {},
  },
});

export const inputTheme = defineStyleConfig({
  variants: {
    mainAuthForm,
  },
});
