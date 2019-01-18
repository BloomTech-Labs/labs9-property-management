import { createGlobalStyle } from 'styled-components';

// Global styles injection - see Home render for implementation info
// add to html to prevent page jumping margin-left: calc(100vw - 100%);
export const GlobalStyle = createGlobalStyle`
html {
    font-size: 62.5%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: white;
    margin-left: calc(100vw - 100%);
}

body {
    line-height: 1.4;
    font-size: 1.6rem;
    margin: 0;
}

h1, h2, h3 {
    margin: 0;
}

a {
    color: #05f;
    font-weight: 300;
    padding-left: .6rem;
    text-decoration: none;
}

ul {
    padding: 0 1rem 2rem 2rem;
    font-weight: 300;
}

li {
    padding: 1rem 0;
}

p {
    font-weight: 300;
    padding: .8rem 0;
}

.active {
    font-weight: 700;
    color: #05f;
}
`;
