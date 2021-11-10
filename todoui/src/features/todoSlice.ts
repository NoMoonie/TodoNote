import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodoState {
    value: string[];
}

const initialState: ITodoState = {
    value: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
        },
    },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
