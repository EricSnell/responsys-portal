import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Helvetica, arial, sans-serif;
    font-size: 62.5%;
    box-sizing: border-box; 
  }
  *, *:before, *:after {
    padding: 0;
    margin: 0;
    outline: 0;
    border: 0;
    box-sizing: inherit;
    list-style: none;
    text-decoration: none;
  }
`