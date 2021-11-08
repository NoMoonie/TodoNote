import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import ITodoList from "../../Interfaces/todolist";
import Todo from "./Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ul = styled.ul`
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    background-color: ${(props) => props.theme.secondarycolor};
    overflow-y: auto;
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
        background: ${(props) => props.theme.input.backgroundcolor};
        border: none;
        color: ${(props) => props.theme.input.textcolor};
        padding-left: 0.5em;
        padding-right: 0.5em;
        :focus {
            background-color: ${(props) => props.theme.input.focus};
        }
    }
`;

const ToastStyle = styled(ToastContainer).attrs({
    className: "toast-container",
    toastClassName: "toast",
    bodyClassName: "body",
    progressClassName: "progress",
})`
    .body {
        color: white;
    }
    button[aria-label="close"] {
        display: none;
    }
    .toast {
        background-color: ${(props) => props.theme.toast.backgroundcolor};
        color: ${(props) => props.theme.toast.textcolor};
    }
    .progress {
        background-color: ${(props) => props.theme.toast.progressbarcolor};
    }
`;

const TodoList: FC<ITodoList> = ({ children, todos, setTodos, todo, setTodo }) => {
    const [value, setValue] = useState("");

    const setEditorText = (e: any, index: any) => {
        const filterTodo = todos.filter((todo: any) => todo.id == e.target.id);
        filterTodo[0].index = index;
        setTodo(filterTodo[0]);
    };

    const addTodo = (text: string) => {
        const newTodo = {
            id: 0,
            title: text,
            isComplete: false,
            text: "",
        };
        fetch("https://localhost:5001/api/Todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const newTodos: any = [...todos, data];
                setTodos(newTodos);
                setTodo(newTodo);
                toast(`${text} Added!`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const completeTodo = (index: number) => {
        const newTodos: any = [...todos];
        newTodos[index].isComplete = true;
        setTodos(newTodos);
        fetch(`https://localhost:5001/api/Todo?id=${newTodos[index].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodos[index]),
        })
            .then((res) => {
                console.log(res);
                toast(`${newTodos[index].title} Completed! ✔️`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeTodo = (id: number) => {
        const filterTodo = todos.filter((todo: any) => todo.id !== id);
        const deletedTodo = todos.filter((todo: any) => todo.id === id);
        setTodos(filterTodo);
        fetch(`https://localhost:5001/api/Todo?id=${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                toast(`${deletedTodo[0].title} Deleted! ❌`);
            })
            .catch((err) => {});
    };

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Wrapper>
            <Ul>
                {todos.map((item: any, index: number) => {
                    return (
                        <Todo
                            id={item.id}
                            key={item.id}
                            isComplete={item.isComplete}
                            title={item.title}
                            isSelected={todo}
                            onClick={setEditorText}
                            onComplete={completeTodo}
                            onRemove={removeTodo}
                            index={index}
                        />
                    );
                })}
            </Ul>
            <InputWrapper onSubmit={HandleSubmit}>
                <input
                    maxLength={25}
                    type="text"
                    placeholder="Add todo..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </InputWrapper>
            <ToastStyle limit={4} pauseOnHover={false} autoClose={3000} hideProgressBar position="top-center" />
        </Wrapper>
    );
};

export default TodoList;
