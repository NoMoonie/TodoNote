import React, { FC, useState } from "react";
import styled from "styled-components";
import IToolbar from "../../Interfaces/toolbar";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import NavItems from "./NavItems";
import DropDown from "./DropDown";

const Nav = styled.nav`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
    height: 3em;
    color: ${(props) => props.theme.textcolor};
`;

const Ul = styled.ul`
    display: flex;
    align-items: center;
    justify-content: end;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Div = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-left: 1em;
    }
`;

const NavBar: FC<IToolbar> = ({ todo, newText, isSaved, setIsSaved, setTodos, todos, setEdit, edit }) => {
    const saveText = () => {
        const oldText = todo.text;
        const updateText = newText;

        const updatedTodo = {
            id: todo.id,
            title: todo.title,
            isComplete: todo.isComplete,
            text: newText,
        };

        if (oldText === updateText) {
            return;
        }

        const newTodos = [...todos];
        newTodos[todo.index].text = newText;
        setTodos(newTodos);
        setIsSaved(true);

        fetch(`https://localhost:5001/api/Todo?id=${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
        })
            .then((res) => {
                console.log(res);
                toast(`${todo.title} Saved! ✔️`);
            })
            .catch((err) => console.log(err));
    };
    return (
        <Nav>
            <Div>
                <span>
                    {todo.title}
                    {isSaved ? "" : " *"}
                </span>
            </Div>
            <Ul>
                <NavItems icon={<AiOutlineEdit />} onClick={() => setEdit(!edit)} />
                <NavItems icon={<AiOutlineSave />} onClick={() => saveText()} />
                <NavItems icon={<IoIosArrowDown />}>
                    <DropDown />
                </NavItems>
            </Ul>
        </Nav>
    );
};

export default NavBar;
