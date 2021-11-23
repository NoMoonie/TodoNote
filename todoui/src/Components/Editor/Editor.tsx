import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import IEditor from "../../Interfaces/editor/editor";
import NavBar from "../NavBar/NavBar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/Store";
import { setSavedText, setText } from "../../features/editorSlice";
import { motion, AnimatePresence } from "framer-motion";

const anim1 = {
    hidden: { width: "0%" },
    show: { width: "95.58%" },
    exit: { width: "0%" },
};

const MarkDownStyle = styled(motion.div)`
    z-index: 99;
    background-color: ${(props) => props.theme.markdown.backgroundcolor};
    color: ${(props) => props.theme.markdown.textcolor};
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
        color: ${(props) => props.theme.link};
    }
    th {
        border: 1px solid #555555;
        padding: 1em;
    }
    td {
        border: 1px solid #404040;
        padding: 1em;
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
    grid-template-columns: ${(props) => (props.edit ? "1fr 1fr" : "0.1fr 1fr 0.1fr")};
    grid-template-rows: 90vh;
`;

const Div = styled.div`
    display: grid;
    grid-template-rows: 0.05fr 1fr;
    margin: 1.5rem;
`;

export const Editor: FC<IEditor> = ({ todo, setTodos, todos }) => {
    const [value, setValue] = useState("");

    const isOpen = useSelector((state: RootState) => state.editor.value.isOpen);

    const selected = useSelector((state: RootState) => state.selectedTodo.value);
    const dispatch = useDispatch();
    useEffect(() => {
        setValue(selected.text);
        dispatch(setText(selected.text));
        dispatch(setSavedText(selected.text));
    }, [selected.id]);

    return (
        <Div>
            <NavBar />
            <Wrapper edit={isOpen}>
                {isOpen ? <CodeEditor value={value} onChange={setValue} /> : <div></div>}
                <AnimatePresence initial={false}>
                    <MarkDownStyle layout variants={anim1} initial="hidden" animate="show" exit="exit">
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
                                a: ({ node, ...props }) => (
                                    <a target="_blank" href={props.href}>
                                        {props.children}
                                    </a>
                                ),
                            }}
                        ></ReactMarkdown>
                    </MarkDownStyle>
                </AnimatePresence>
            </Wrapper>
        </Div>
    );
};
