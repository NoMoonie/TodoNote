import React, { FC } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/nord.css";
import "codemirror/mode/markdown/markdown";
import { Controlled as ControlledEditor } from "react-codemirror2";
import styled from "styled-components";
import ICodeEditor from "../../Interfaces/editor/codeEditor";
import { useDispatch, useSelector } from "react-redux";
import { setIsSaved, setSavedText, setText } from "../../features/editorSlice";
import { RootState } from "../../App/Store";
import { selectTodo } from "../../features/selectedTodoSlice";
import { updateText } from "../../features/todoSlice";
import { putReq } from "../../Api/function";
import { toast } from "react-toastify";

const EditorWrapper = styled.div`
    background-color: ${(props) => props.theme.editor.backgroundcolor};
    color: ${(props) => props.theme.editor.textcolor};
    .CodeMirror {
        height: 90vh;
        word-wrap: break-word;
        width: 1fr;
    }
    overflow: auto;
`;

export const CodeEditor: FC<ICodeEditor> = ({ value, onChange }) => {
    const dispatch = useDispatch();

    const selectedTodo = useSelector((state: RootState) => state.selectedTodo);
    const editor = useSelector((state: RootState) => state.editor.value);

    const HandleChange = (editor: any, data: any, value: string) => {
        onChange(value);
        dispatch(setText(value));
        if (value !== selectedTodo.value.text) {
            dispatch(setIsSaved(false));
        } else dispatch(setIsSaved(true));
    };
    return (
        <EditorWrapper>
            <ControlledEditor
                className="code-editor"
                onBeforeChange={HandleChange}
                value={value}
                options={{
                    lineWrapping: true,
                    lint: false,
                    mode: "markdown",
                    theme: "nord",
                    extraKeys: {
                        "Ctrl-S": () => {
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
                        },
                    },
                }}
            />
        </EditorWrapper>
    );
};
