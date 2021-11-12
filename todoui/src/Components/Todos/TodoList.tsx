import React, { FC, useState } from "react";
import styled from "styled-components";
import ITodoList from "../../Interfaces/todo/todolist";
import Todo from "./Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/Store";
import { addTodo, completeTodo, deleteTodo, updateText } from "../../features/todoSlice";
import { postReq, putReq } from "../../Api/function";
import { selectTodo, setIndex } from "../../features/selectedTodoSlice";
import { setIsOpen, setIsSaved, setSavedText } from "../../features/editorSlice";
import NotSavedModal from "../Modals/NotSavedModal";
import { AnimatePresence } from "framer-motion";

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

const TodoList: FC<ITodoList> = ({}) => {
    const [value, setValue] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [data, setData] = useState({
        todo: {
            id: 0,
            title: "",
            isComplete: false,
            text: "",
        },
        index: 0,
    });

    const dispatch = useDispatch();
    const selectedTodo = useSelector((state: RootState) => state.selectedTodo);
    const Todos = useSelector((state: RootState) => state.todos.value);
    const editor = useSelector((state: RootState) => state.editor.value);

    const setEditorText = (e: any, index: any) => {
        if (!editor.isSaved) {
            const filterTodo = Todos.filter((todo: any) => todo.id == e.target.id);
            setData({
                todo: filterTodo[0],
                index: index,
            });
            setIsModal(true);
            return;
        }
        const filterTodo = Todos.filter((todo: any) => todo.id == e.target.id);
        if (filterTodo[0].isComplete) dispatch(setIsOpen(false));
        dispatch(setIndex(index));
        dispatch(selectTodo(filterTodo[0]));
    };

    const add = (text: string) => {
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

    const complete = (index: number) => {
        dispatch(completeTodo(index));
        dispatch(setIsOpen(false));
    };

    const remove = (id: number) => {
        dispatch(deleteTodo(id));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;
        add(value);
        setValue("");
    };

    const handelClose = () => {
        setIsModal(false);
    };

    const handleSave = () => {
        if (!editor.isOpen) return;
        if (selectedTodo.value.id === 0) return;
        const newText = editor.text;
        const savedText = editor.savedText;
        if (newText === savedText) return;
        const updatedTodo = {
            id: selectedTodo.value.id,
            title: selectedTodo.value.title,
            isComplete: selectedTodo.value.isComplete,
            text: newText,
        };
        dispatch(setIsSaved(true));
        dispatch(selectTodo(updatedTodo));
        dispatch(setSavedText(newText));
        dispatch(updateText({ text: newText, index: selectedTodo.index }));
        putReq(selectedTodo.value.id, updatedTodo).then((data) => {
            toast(`${data.title} Saved! ✔️`);
        });

        setIsModal(false);
        if (data.todo.isComplete) dispatch(setIsOpen(false));
        dispatch(setIndex(data.index));
        dispatch(selectTodo(data.todo));
    };

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
                            isSelected={selectedTodo}
                            onClick={setEditorText}
                            onComplete={complete}
                            onRemove={remove}
                            index={index}
                        />
                    );
                })}
            </Ul>
            <AnimatePresence exitBeforeEnter={true}>
                {isModal && <NotSavedModal handleSave={handleSave} handleClose={handelClose} />}
            </AnimatePresence>
            <InputWrapper onSubmit={handleSubmit}>
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
