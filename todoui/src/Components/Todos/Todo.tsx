import React, { FC, useState } from "react";
import styled from "styled-components";
import ITodo from "../../Interfaces/todo/todos";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";

const Li = styled(motion.li)<{ isComplete?: boolean; isSelected?: boolean }>`
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    color: ${(props) => (props.isComplete ? props.theme.todo.complete : props.theme.todo.notcomplete)};
    text-decoration: ${(props) => (props.isComplete ? "line-through" : "")};
    height: 3em;
    margin: 1em;
    border-radius: 0.5em;
    overflow: hidden;
    border: 1px solid ${(props) => (props.isSelected ? props.theme.todo.selected : props.theme.todo.backgroundcolor)};
`;

const P = styled.p<{ isSelected?: boolean }>`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    //background-color: ${(props) => (props.isSelected ? props.theme.todo.selected : props.theme.todo.backgroundcolor)};
    padding-left: 1em;
    :hover {
        background-color: ${(props) => props.theme.todo.hover};
    }
    overflow-x: hidden;
    word-break: none;
`;

const Button = styled.button<{ isComplete: boolean }>`
    cursor: pointer;
    color: ${(props) => props.theme.button.textcolor};
    background: ${(props) => props.theme.button.backgroundcolor};
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

const variants = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
};

const Todo: FC<ITodo> = ({ title, isComplete, isSelected, id, onClick, onComplete, index, onRemove }) => {
    return (
        <Li
            key={id}
            id={id}
            isComplete={isComplete}
            isSelected={isSelected.value.id == id}
            layout
            variants={variants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{
                duration: 0.2,
                delay: index * 0.05,
            }}
        >
            <P id={id} onClick={(e) => onClick(e, index)} isSelected={isSelected.value.id == id}>
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
