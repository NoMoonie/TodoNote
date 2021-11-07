import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import IEditor from "../../Interfaces/editor";
import { ToolBar } from "./ToolBar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const EditorStyle = styled.textarea`
    background-color: ${(props) => props.theme.main.editor.backgroundcolor};
    color: ${(props) => props.theme.main.editor.textcolor};
    border: none;
    outline: none;
    padding-top: 1rem;
    overflow-y: auto;
    resize: none;
    font-size: 12pt;
`;

const MarkDownStyle = styled.section`
    background-color: ${(props) => props.theme.main.secondarycolor};
    outline: none;
    padding-left: 1em;
    padding-right: 1em;
    overflow-y: auto;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Div = styled.div`
    display: grid;
    grid-template-rows: 0.05fr 1fr;
    margin: 1.5rem;
`;

export const Editor: FC<IEditor> = ({ todo, setTodos, todos }) => {
    const [value, setValue] = useState("");
    const [isSaved, setIsSaved] = useState(true);

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
            />
            <Wrapper>
                <EditorStyle value={value} onChange={(e: any) => update(e)} />
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
