import { motion } from "framer-motion";
import React, { FC } from "react";
import styled from "styled-components";
import Backdrop from "../BackDrop/BackDrop";

const Form = styled(motion.form)`
    background-color: #181818;
    padding: 0.5em;
    border-radius: 0.5em;

    input[type="text"] {
        border: 1px solid #404040;
        width: 20em;
        outline: none;
        font-size: 15pt;
        background: ${(props) => props.theme.input.backgroundcolor};
        border-radius: 0.5em;
        color: ${(props) => props.theme.input.textcolor};
        padding: 0.5em;
        height: 100%;
        :focus {
            background-color: ${(props) => props.theme.input.focus};
        }
    }
`;

const AddTodoModal: FC<{ HandleClose: any; HandleSubmit: any; value: string; setValue: any }> = ({
    HandleClose,
    HandleSubmit,
    value,
    setValue,
}) => {
    const handleSubmitClose = (e: any) => {
        HandleSubmit(e);
        HandleClose();
    };

    return (
        <Backdrop onClick={HandleClose}>
            <Form
                onSubmit={(e) => handleSubmitClose(e)}
                className="todo-form"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: "-10vh" }}
                animate={{ y: 0 }}
                exit={{ y: "10vh" }}
            >
                <input
                    autoFocus
                    type="text"
                    placeholder="Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Form>
        </Backdrop>
    );
};

export default AddTodoModal;
