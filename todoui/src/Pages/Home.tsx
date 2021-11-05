import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "../Components/TextEditor/Editor";
import Todo from "../Components/Todos/Todo";
import TodoList from "../Components/Todos/TodoList";
import IPage from "../Interfaces/page";

const Div = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
`;

const Home: FC<IPage> = (props) => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        fetch("https://localhost:5001/api/Todo")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTodo(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Div>
            <TodoList>
                {todo.map((item: any) => {
                    return <Todo key={item.id} isComplete={item.isComplete} title={item.title} />;
                })}
            </TodoList>
            <Editor />
        </Div>
    );
};

export default Home;
