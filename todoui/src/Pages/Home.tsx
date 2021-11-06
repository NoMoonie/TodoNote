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

const InputWrapper = styled.form`
    display: flex;
    input {
        width: 100%;
        outline: none;
        font-size: 14pt;
        background: #222;
        border: none;
        color: white;
        :focus {
            background-color: #333;
        }
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #222;
        color: white;
        width: 4em;
        border: none;
    }
`;

const Home: FC<IPage> = (props) => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({});
    const [value, setValue] = useState("");

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

    const addTodo = (text: string) => {
        const newTodo = {
            id: 0,
            title: text,
            isComplete: false,
            text: "",
        };
        const newTodos: any = [...todos, newTodo];
        setTodos(newTodos);
        fetch("https://localhost:5001/api/Todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeTodo = (id: number) => {};

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;

        addTodo(value);
        setValue("");
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
                </TodoList>
                <InputWrapper onSubmit={HandleSubmit}>
                    <input
                        type="text"
                        placeholder="Add todo..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button>Add</button>
                </InputWrapper>
            </Wrapper>
            <Editor todo={todo} />
            <div></div>
        </Div>
    );
};

export default Home;
