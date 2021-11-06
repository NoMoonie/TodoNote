import React, { FC, useState } from "react";
import styled from "styled-components";
import ITodo from "../../Interfaces/todos";
import { AiOutlineClose } from "react-icons/ai";

const Li = styled.li<{ isComplete?: boolean; isSelected?: boolean }>`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    color: ${(props) => (props.isComplete ? props.theme.main.complete : props.theme.main.notcomplete)};
    background-color: ${(props) => props.theme.main.todo.backgroundcolor};
    background-color: ${(props) =>
        props.isSelected ? props.theme.main.selected : props.theme.main.todo.backgroundcolor};
    height: 3em;
    cursor: pointer;
    :hover {
        background-color: ${(props) => props.theme.main.todo.hover};
    }
    margin: 1em;
    p {
        padding-left: 1em;
        pointer-events: none;
    }
`;

const Button = styled.button`
    justify-self: end;
    color: ${(props) => props.theme.main.button.textcolor};
    background-color: #555;
    cursor: pointer;
    height: 80%;
    margin-right: 0.5em;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    svg {
        width: 25px;
        height: 25px;
    }
    :hover {
        background-color: #444;
    }
`;

const Todo: FC<ITodo> = ({ title, isComplete, isSelected, id, onClick }) => {
    return (
        <Li id={id} isComplete={isComplete} isSelected={isSelected} onClick={onClick}>
            <p>{title}</p>
            <Button>Complete</Button>
        </Li>
    );
};

export default Todo;
