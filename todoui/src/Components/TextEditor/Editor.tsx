import React, { FC } from "react";
import styled from "styled-components";
import IEditor from "../../Interfaces/editor";
import { ToolBar } from "./ToolBar";
import DOMpurify from "dompurify";

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

export const Editor: FC<IEditor> = ({ todo }) => {
    return (
        <Div>
            <ToolBar />
            <Section contentEditable dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(todo.text) }}></Section>
        </Div>
    );
};
