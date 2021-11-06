import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "../Components/TextEditor/Editor";
import TodoList from "../Components/Todos/TodoList";
import IPage from "../Interfaces/page";
import { GoDiffAdded } from "react-icons/go";

const Div = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    height: 100vh;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 0.08fr;
    margin: 1.5em;
    overflow-y: auto;
`;

const InputWrapper = styled.form`
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    display: flex;
    input {
        width: 100%;
        outline: none;
        font-size: 17pt;
        background: #222;
        border: none;
        color: white;
        padding-left: 1em;
        :focus {
            background-color: #333;
        }
    }
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
    /*
    
    */

    return (
        <Div>
            <TodoList todos={todos} setTodos={setTodos} todo={todo} setTodo={setTodo} />
            <Editor todo={todo} />
            <div></div>
        </Div>
    );
};

export default Home;
