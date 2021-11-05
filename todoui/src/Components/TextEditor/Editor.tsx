import React from "react";
import styled from "styled-components";
import { ToolBar } from "./ToolBar";

const Section = styled.div`
    background-color: ${(props) => props.theme.main.editor.backgroundcolor};
    outline: none;
    padding: 1rem;
    overflow-y: auto;
`;

const Div = styled.div`
    display: grid;
    grid-template-rows: 0.05fr 1fr;
    margin: 1.5rem;
    overflow-y: auto;
`;

export const Editor = () => {
    return (
        <Div>
            <ToolBar />
            <Section contentEditable></Section>
        </Div>
    );
};
