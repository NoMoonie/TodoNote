import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "../Components/TextEditor/Editor";
import Todo from "../Components/Todos/Todo";
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
`;

const Button = styled.button`
    display: flex;
    background: none;
    border: none;
    color: white;
    margin-left: 1.5em;
    svg {
        width: 25px;
        height: 25px;
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

    const setEditorText = (e: any) => {
        const filterTodo: any = todos.filter((item: any) => {
            if (item.id == e.target.id) {
                return item;
            }
        });
        setTodo(filterTodo[0]);
    };

    return (
        <Div>
            <Wrapper>
                <TodoList>
                    {todos.map((item: any) => {
                        return (
                            <Todo
                                id={item.id}
                                key={item.id}
                                isComplete={item.isComplete}
                                title={item.title}
                                isSelected={false}
                                onClick={setEditorText}
                            />
                        );
                    })}
                    <Button>
                        <GoDiffAdded />
                    </Button>
                </TodoList>
            </Wrapper>
            <Editor todo={todo} />
            <div></div>
        </Div>
    );
};

export default Home;
