import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodoItem {
    id: number;
    title: string;
    isComplete: boolean;
    text: string;
}

interface ISelectedTodoState {
    value: ITodoItem;
    index: number;
}

const initialState: ISelectedTodoState = {
    value: {
        id: 0,
        title: "",
        isComplete: false,
        text: "",
    },
    index: 0,
};

export const selectedTodoSlice = createSlice({
    name: "selectedTodo",
    initialState,
    reducers: {
        selectTodo: (state, action: PayloadAction<ITodoItem>) => {
            state.value = action.payload;
        },
        setIndex: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
        },
    },
});

export const { selectTodo, setIndex } = selectedTodoSlice.actions;

export default selectedTodoSlice.reducer;
