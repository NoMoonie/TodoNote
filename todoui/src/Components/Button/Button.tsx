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
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        background-color: ${(props) => (props.primary ? props.theme.buttonprimary.hover : props.theme.button.hover)};
    }
    border-radius: ${(props) => (props.br ? props.br : "0.5em")};
`;

const Button: FC<IButton> = ({ children, onClick, primary, br, anim }) => {
    return (
        <ButtonStyle
            whileHover={anim ? { scale: 1.1 } : {}}
            whileTap={anim ? { scale: 0.9 } : {}}
            br={br}
            onClick={onClick}
            primary={primary}
        >
            {children}
        </ButtonStyle>
    );
};

export default Button;
