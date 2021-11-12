import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEditor {
    text: string;
    isSaved: boolean;
    savedText: string;
    isOpen: boolean;
}

interface IEditorState {
    value: IEditor;
}

const initialState: IEditorState = {
    value: {
        text: "",
        savedText: "",
        isSaved: true,
        isOpen: false,
    },
};

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.value.text = action.payload;
        },
        setSavedText: (state, action: PayloadAction<string>) => {
            state.value.savedText = action.payload;
        },
        setIsSaved: (state, action: PayloadAction<boolean>) => {
            state.value.isSaved = action.payload;
        },
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.value.isOpen = action.payload;
        },
    },
});

export const { setText, setIsSaved, setSavedText, setIsOpen } = editorSlice.actions;

export default editorSlice.reducer;
