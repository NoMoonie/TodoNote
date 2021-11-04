import styled, { createGlobalStyle } from "styled-components";
import Theme from "./Themes/theme.json";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        font-family: ${Theme.font}, sans-serif;
        ::selection{
            color: #fff; 
            background-color:#fc5185;
        }
    }
    body{
        background-color: ${Theme.main.backgroundcolor};
        color: ${Theme.main.textcolor};
    }
`;

export default GlobalStyle;
