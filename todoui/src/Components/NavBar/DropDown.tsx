import { motion } from "framer-motion";
import React, { FC } from "react";
import styled from "styled-components";
import { FaHome, FaUndo } from "react-icons/fa";

interface DropDownItem {
    icon?: any;
    children?: any;
}

const dropIn = {
    hidden: { y: "2em", opacity: 0 },
    show: { y: "6em", opacity: 1 },
    exit: { y: "2em", opacity: 0 },
};

const Div = styled(motion.div)`
    z-index: 100;
    user-select: none;
    position: absolute;
    right: 1em;
    top: 0em;
    background-color: #282828;
    list-style: none;
    width: 300px;
    padding: 1em;
    border-radius: 1em;
`;

const Li = styled.li`
    display: flex;
    align-items: center;
    padding: 1em;
    background-color: #181818;
    svg {
        width: 25px;
        height: 25px;
        margin-right: 0.5em;
    }
`;

const DropDownItem: FC<DropDownItem> = ({ children, icon }) => {
    return (
        <Li>
            <span>{icon}</span>
            {children}
        </Li>
    );
};

const DropDown: FC = () => {
    return (
        <Div variants={dropIn} initial="hidden" animate="show" exit="exit">
            <DropDownItem icon={<FaHome />}>Home</DropDownItem>
            <DropDownItem>About</DropDownItem>
            <DropDownItem>Setting</DropDownItem>
            <DropDownItem icon={<FaUndo />}>Set selected to uncomplete</DropDownItem>
        </Div>
    );
};

export default DropDown;
