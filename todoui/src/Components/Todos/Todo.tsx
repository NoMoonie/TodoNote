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
    overflow-x: hidden;
`;

const P = styled.p`
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${(props) => props.theme.main.todo.backgroundcolor};
    padding-left: 1em;
    :hover {
        background-color: ${(props) => props.theme.main.todo.hover};
    }
`;

const Button = styled.button`
    color: ${(props) => props.theme.main.button.textcolor};
    background: #444;
    border: 1px solid #444;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 25px;
        height: 25px;
    }
    :hover {
        background-color: ${(props) => props.theme.main.todo.hover};
    }
`;

const Todo: FC<ITodo> = ({ title, isComplete, isSelected, id, onClick, onComplete, index, onRemove }) => {
    return (
        <Li id={id} isComplete={isComplete} isSelected={isSelected}>
            <P id={id} onClick={onClick}>
                {title}
            </P>

            {isComplete ? (
                <Button id={id} onClick={() => onRemove(id)}>
                    <AiOutlineClose />
                </Button>
            ) : (
                <Button id={id} onClick={() => onComplete(index)}>
                    <AiOutlineCheck />
                </Button>
            )}
        </Li>
    );
};

export default Todo;
