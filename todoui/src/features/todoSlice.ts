import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteReq, putReq } from "../Api/function";

interface todoObject {
    id: number;
    title: string;
    isComplete: boolean;
    text: string;
}

interface IUpdate {
    text: string;
    index: number;
}

interface ITodoState {
    value: todoObject[];
}

const initialState: ITodoState = {
    value: [],
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        updateText: (state, action: PayloadAction<IUpdate>) => {
            const newState = [...state.value];
            newState[action.payload.index].text = action.payload.text;
            state.value = newState;
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const filterTodo = state.value.filter((todo: any) => todo.id !== action.payload);
            state.value = filterTodo;

            //update database
            const id = action.payload;
            deleteReq(id).then((data) => {
                toast(`${data.title} Deleted! ❌`);
            });
        },
        completeTodo: (state, action: PayloadAction<number>) => {
            const newTodos = [...state.value];
            newTodos[action.payload].isComplete = true;
            state.value = newTodos;

            //update database
            const id = newTodos[action.payload].id;
            putReq(id, newTodos[action.payload]).then((data) => {
                toast(`${data.title} Completed! ✔️`);
            });
        },
        addTodo: (state, action: PayloadAction<todoObject>) => {
            state.value.push(action.payload);
        },
        setDataBaseState: (state, action: PayloadAction<[]>) => {
            state.value = action.payload;
        },
    },
});

export const { addTodo, setDataBaseState, completeTodo, deleteTodo, updateText } = todoSlice.actions;

export default todoSlice.reducer;
