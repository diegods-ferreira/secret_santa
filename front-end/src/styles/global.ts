import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F4E3B2;
  }

  body, input, button, textarea {
    font-family: Roboto;
    font-size: 16px;
    color: #222222;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Ubuntu;
    color: #222222;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;