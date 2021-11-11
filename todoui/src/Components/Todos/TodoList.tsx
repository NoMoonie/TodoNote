import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import ITodoList from "../../Interfaces/todo/todolist";
import Todo from "./Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTodoModal from "./AddTodoModal";
import Button from "../Button/Button";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/Store";
import { addTodo, completeTodo, deleteTodo } from "../../features/todoSlice";
import { deleteReq, postReq, putReq } from "../../Api/function";

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
    input[type="text"] {
        width: 100%;
        outline: none;
        font-size: 15pt;
        background: ${(props) => props.theme.input.backgroundcolor};
        color: ${(props) => props.theme.input.textcolor};
        padding: 0.5em;
        border: none;
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
        border: ${(props) => props.theme.toast.border};
    }
    .progress {
        background-color: ${(props) => props.theme.toast.progressbarcolor};
    }
`;

const TodoList: FC<ITodoList> = ({ children, todos, setTodos, todo, setTodo }) => {
    const [value, setValue] = useState("");

    const dispatch = useDispatch();

    const setEditorText = (e: any, index: any) => {
        const filterTodo = todos.filter((todo: any) => todo.id == e.target.id);
        //filterTodo[0].index = index;
        setTodo(filterTodo[0]);
    };

    const addTodoTo = (text: string) => {
        const newTodo = {
            id: 0,
            title: text,
            isComplete: false,
            text: `# ${text}`,
        };
        postReq(newTodo).then((data) => {
            dispatch(addTodo(data));
            toast(`${data.title} Added!`);
        });
    };

    const completeTodoTo = (index: number) => {
        dispatch(completeTodo(index));
    };

    const removeTodo = (id: number) => {
        dispatch(deleteTodo(id));
    };

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;
        addTodoTo(value);
        setValue("");
    };

    const Todos = useSelector((state: RootState) => state.todos.value);

    return (
        <Wrapper>
            <Ul>
                {Todos.map((item: any, index: number) => {
                    return (
                        <Todo
                            id={item.id}
                            key={item.id}
                            isComplete={item.isComplete}
                            title={item.title}
                            isSelected={todo}
                            onClick={setEditorText}
                            onComplete={completeTodoTo}
                            onRemove={removeTodo}
                            index={index}
                        />
                    );
                })}
            </Ul>
            <InputWrapper onSubmit={HandleSubmit}>
                <input
                    type="text"
                    maxLength={25}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add todo..."
                />
            </InputWrapper>
            <ToastStyle limit={4} pauseOnHover={false} autoClose={3000} hideProgressBar position="top-center" />
        </Wrapper>
    );
};

export default TodoList;
