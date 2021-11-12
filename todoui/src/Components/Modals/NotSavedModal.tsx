import { motion } from "framer-motion";
import React, { FC } from "react";
import styled from "styled-components";
import INotSavedModal from "../../Interfaces/notsavedmodal";
import Backdrop from "../BackDrop/BackDrop";
import Button from "../Button/Button";

const Div = styled(motion.div)`
    width: clamp(20%, 400px, 90%);
    background-color: ${(props) => props.theme.backgroundcolor};
    color: ${(props) => props.theme.textcolor};
    border: 1px solid #404040;
    border-radius: 0.5em;
    padding: 1em;
    text-align: center;

    .buttons {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
`;

const NotSavedModal: FC<INotSavedModal> = ({ handleClose, handleSave }) => {
    return (
        <Backdrop onClick={handleClose}>
            <Div onClick={(e) => e.stopPropagation()} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <h2>You haven't saved!</h2>
                <div className="buttons">
                    <Button onClick={handleSave} primary>
                        Save
                    </Button>
                    <Button onClick={handleClose} primary>
                        cancel
                    </Button>
                </div>
            </Div>
        </Backdrop>
    );
};

export default NotSavedModal;
