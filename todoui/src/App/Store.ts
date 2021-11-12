import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import selectedtodoReducer from "../features/selectedTodoSlice";
import editorReducer from "../features/editorSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        selectedTodo: selectedtodoReducer,
        editor: editorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
