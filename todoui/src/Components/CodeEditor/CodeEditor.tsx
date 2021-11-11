import React, { FC } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/nord.css";
import "codemirror/mode/markdown/markdown";
import { Controlled as ControlledEditor } from "react-codemirror2";
import styled from "styled-components";
import ICodeEditor from "../../Interfaces/editor/codeEditor";
import { useDispatch, useSelector } from "react-redux";
import { setIsSaved, setText } from "../../features/editorSlice";
import { RootState } from "../../App/Store";

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

    const selectedTodo = useSelector((state: RootState) => state.selectedTodo.value);

    const HandleChange = (editor: any, data: any, value: string) => {
        onChange(value);
        dispatch(setText(value));
        if (value !== selectedTodo.text) {
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
                }}
            />
        </EditorWrapper>
    );
};
