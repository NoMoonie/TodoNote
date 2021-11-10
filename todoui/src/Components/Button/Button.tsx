import { motion } from "framer-motion";
import React, { FC } from "react";
import styled from "styled-components";
import IButton from "../../Interfaces/button";

const ButtonStyle = styled(motion.div)<IButton>`
    cursor: pointer;
    background-color: ${(props) =>
        props.primary ? props.theme.buttonprimary.backgroundcolor : props.theme.button.backgroundcolor};
    color: ${(props) => (props.primary ? props.theme.buttonprimary.textcolor : props.theme.button.textcolor)};
    border: ${(props) => (props.primary ? props.theme.buttonprimary.border : props.theme.button.border)};
    padding: 0.5rem 1rem;
    :hover {
        background-color: ${(props) => (props.primary ? props.theme.buttonprimary.hover : props.theme.button.hover)};
    }
    border-radius: 0.5em;
`;

const Button: FC<IButton> = ({ children, onClick, primary }) => {
    return (
        <ButtonStyle whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClick} primary={primary}>
            {children}
        </ButtonStyle>
    );
};

export default Button;
