import styled, { createGlobalStyle } from "styled-components";
import Theme from "./Themes/theme.json";

const GlobalStyle = createGlobalStyle`
    *{
        font-family: ${Theme.font}, sans-serif;
    }
    body{
        background-color: ${Theme.main.backgroundcolor};
        color: ${Theme.main.textcolor};
    }
`;

export default GlobalStyle;
