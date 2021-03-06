import React, { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Div = styled(motion.div)`
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #000000e1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Backdrop: FC<{ onClick: any }> = ({ children, onClick }) => {
    return (
        <Div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClick}>
            {children}
        </Div>
    );
};

export default Backdrop;
