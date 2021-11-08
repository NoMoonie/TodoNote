import React, { FC } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/markdown/markdown";
import { Controlled as ControlledEditor } from "react-codemirror2";
import styled from "styled-components";
import ICodeEditor from "../../Interfaces/codeEditor";

const EditorWrapper = styled.div`
    background-color: ${(props) => props.theme.editor.backgroundcolor};
    color: ${(props) => props.theme.editor.textcolor};
`;

export const CodeEditor: FC<ICodeEditor> = ({ value, onChange }) => {
    const HandleChange = (editor: any, data: any, value: string) => {
        onChange(value);
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
                    theme: "material-palenight",
                    viewportMargin: Infinity,
                }}
            />
        </EditorWrapper>
    );
};
