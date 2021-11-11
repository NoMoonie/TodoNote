import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodoState {
    value: object[];
}

const initialState: ITodoState = {
    value: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<object>) => {
            state.value.push(action.payload);
        },
        setDataBaseState: (state, action: PayloadAction<[]>) => {
            state.value = action.payload;
        },
    },
});

export const { addTodo, setDataBaseState } = todoSlice.actions;

export default todoSlice.reducer;
