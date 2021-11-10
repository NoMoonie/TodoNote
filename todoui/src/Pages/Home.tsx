import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "../Components/Editor/Editor";
import TodoList from "../Components/Todos/TodoList";
import IPage from "../Interfaces/pages/page";
import { GoDiffAdded } from "react-icons/go";

const Div = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    height: 100vh;
`;

const Home: FC<IPage> = (props) => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({});

    useEffect(() => {
        fetch("https://localhost:5001/api/Todo")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTodos(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Div>
            <TodoList todos={todos} setTodos={setTodos} todo={todo} setTodo={setTodo} />
            <Editor todo={todo} setTodos={setTodos} todos={todos} />
        </Div>
    );
};

export default Home;
