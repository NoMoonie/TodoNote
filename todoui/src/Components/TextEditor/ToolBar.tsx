import React, { FC } from "react";
import styled from "styled-components";
import IToolbar from "../../Interfaces/toolbar";
import { toast } from "react-toastify";

const Nav = styled.nav`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
    height: 3em;
`;

const Div = styled.div`
    display: flex;
    align-items: center;
`;

const Ul = styled.ul`
    display: flex;
    align-items: center;
    justify-content: end;
    list-style: none;

    margin: 0;
    padding: 0;
`;

const Li = styled.li`
    :hover {
        background-color: ${(props) => props.theme.main.editor.backgroundcolor};
    }
    border: 1px solid white;
    border-radius: 10px;
    cursor: pointer;
    width: 3rem;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ToolBar: FC<IToolbar> = ({ todo, newText, isSaved, setIsSaved, setTodos, todos }) => {
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
                <Li onClick={saveText}>Save</Li>
            </Ul>
        </Nav>
    );
};
