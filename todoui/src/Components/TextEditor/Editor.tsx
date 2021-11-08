import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import IEditor from "../../Interfaces/editor";
import { ToolBar } from "./ToolBar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const EditorStyle = styled.textarea`
    background-color: ${(props) => props.theme.editor.backgroundcolor};
    color: ${(props) => props.theme.editor.textcolor};
    border: none;
    outline: none;
    padding-top: 1rem;
    resize: none;
    font-size: 12pt;
    overflow-y: auto;
`;

const MarkDownStyle = styled.div`
    background-color: ${(props) => props.theme.markdown.backgroundcolor};
    padding-left: 1em;
    padding-right: 1em;
    word-wrap: break-word;
    height: 100%;
    overflow-y: auto;
    blockquote {
        background-color: ${(props) => props.theme.markdown.blockquote};
        padding: 0.5em;
        border-radius: 1em;
    }
    a {
        color: ${(props) => props.theme.todo.notcomplete};
    }

    .task-list-item {
        display: flex;
        align-items: top;
    }

    input[type="checkbox"] {
        appearance: none;
        width: 1em;
        height: 1em;
        border: 2px solid #555;
        background-clip: content-box;
        padding: 2px;
        margin-right: 2em;
    }
    input[type="checkbox"]:checked {
        background-color: ${(props) => props.theme.markdown.checkboxcolor};
        border: 2px solid ${(props) => props.theme.markdown.checkboxcolor};
    }
`;

const Wrapper = styled.div<{ edit: boolean }>`
    display: grid;
    grid-template-columns: ${(props) => (props.edit ? "1fr 1fr" : "1fr")};
    grid-template-rows: 90vh;
`;

const Div = styled.div`
    display: grid;
    grid-template-rows: 0.05fr 1fr;
    margin: 1.5rem;
`;

export const Editor: FC<IEditor> = ({ todo, setTodos, todos }) => {
    const [value, setValue] = useState("");
    const [isSaved, setIsSaved] = useState(true);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setValue(todo.text);
    }, [todo.id]);

    const update = (e: any) => {
        setValue(e.target.value);
        if (e.target.value != todo.text) {
            setIsSaved(false);
        } else setIsSaved(true);
    };

    return (
        <Div>
            <ToolBar
                todo={todo}
                newText={value}
                isSaved={isSaved}
                setTodos={setTodos}
                todos={todos}
                setIsSaved={setIsSaved}
                edit={edit}
                setEdit={setEdit}
            />
            <Wrapper edit={edit}>
                {edit ? <EditorStyle value={value} onChange={(e: any) => update(e)} /> : ""}
                <MarkDownStyle>
                    <ReactMarkdown
                        children={value}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, "")}
                                        style={dracula}
                                        language={match[1]}
                                        PreTag="div"
                                    />
                                ) : (
                                    <code className={className} {...props}></code>
                                );
                            },
                        }}
                    ></ReactMarkdown>
                </MarkDownStyle>
            </Wrapper>
        </Div>
    );
};
