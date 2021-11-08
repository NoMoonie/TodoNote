import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        font-family: "DM Mono", sans-serif;
        ::selection{
            color: #fff; 
            background-color:#fc5185;
        }
    }
    body{
        margin: 0;
        padding: 0;
        background-color: #fff;
        color: #000;
    }

    ::-webkit-scrollbar{
        width: .5em;
    }

    ::-webkit-scrollbar-track{
        background-color: #555;
        margin-block: .5em;
        border-radius: 100vw;
    }

    ::-webkit-scrollbar-thumb{
        background-color: #999;
        border-radius: 100vw;
        cursor: pointer;
        :hover{
            background-color: #fff;
        }
    }
`;

export default GlobalStyle;
