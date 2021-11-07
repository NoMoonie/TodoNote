import React, { FC, useState } from "react";
import styled from "styled-components";
import ITodo from "../../Interfaces/todos";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const Li = styled.li<{ isComplete?: boolean; isSelected?: boolean }>`
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    color: ${(props) => (props.isComplete ? props.theme.main.complete : props.theme.main.notcomplete)};
    text-decoration: ${(props) => (props.isComplete ? "line-through" : "")};
    height: 3em;
    margin: 1em;
`;

const P = styled.p`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${(props) => props.theme.main.todo.backgroundcolor};
    padding-left: 1em;
    :hover {
        background-color: ${(props) => props.theme.main.todo.hover};
    }
    overflow-x: hidden;
    word-break: none;
`;

const Button = styled.button<{ isComplete: boolean }>`
    cursor: pointer;
    color: ${(props) => props.theme.main.button.textcolor};
    background: #444;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 25px;
        height: 25px;
    }
    :hover {
        background-color: ${(props) => (props.isComplete ? "red" : "green")};
    }
`;

const Todo: FC<ITodo> = ({ title, isComplete, isSelected, id, onClick, onComplete, index, onRemove }) => {
    return (
        <Li id={id} isComplete={isComplete} isSelected={isSelected}>
            <P id={id} onClick={(e) => onClick(e, index)}>
                {title}
            </P>

            {isComplete ? (
                <Button id={id} onClick={() => onRemove(id)} isComplete={isComplete}>
                    <AiOutlineClose />
                </Button>
            ) : (
                <Button id={id} onClick={() => onComplete(index)} isComplete={isComplete}>
                    <AiOutlineCheck />
                </Button>
            )}
        </Li>
    );
};

export default Todo;
