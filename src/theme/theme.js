import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './components/button.extend';
import { inputTheme } from './components/input.extend';
import { textareaTheme } from './components/textarea.extend';

const breakpoints = {
  sm: '320px',
  md: '480px',
  lg: '768px',
  xl: '1280px',
};

const shadows = {};

const colors = {
  grassTeal: '#88ccca',
  main: '#dAdDdF',
  textColor: '#222222',
  accent: '#776281',
  accentHover: '#8873a2',
  box: '#c6cbd2aa',
  postTitle: '#4E616D',
};

const styles = {
  global: () => ({
    body: {
      bg: 'main',
      color: 'primaryTextColor',
    },
  }),
};

const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
};

const components = {
  Button: buttonTheme,
  Input: inputTheme,
  Textarea: textareaTheme,
};

const theme = extendTheme({
  colors,
  shadows,
  styles,
  components,
  breakpoints,
  fonts,
});
export default theme;