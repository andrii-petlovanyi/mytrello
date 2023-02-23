import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const main = defineStyle({
  padding: '5px 5px',

  backgroundColor: 'mainColor',
  color: 'textColor',

  border: '1px solid',
  borderColor: 'accent',
  borderRadius: '5px',

  _focus: {
    boxShadow: '0 0 1px 1px #D3D3D333',
  },
  _hover: {
    borderColor: 'accentHover',
  },
});

export const textareaTheme = defineStyleConfig({
  variants: {
    main,
  },
});
