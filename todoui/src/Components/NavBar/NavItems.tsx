import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

interface INavItems {
    icon: any;
    onClick?: any;
}

const Li = styled(motion.li)`
    :hover {
        background-color: ${(props) => props.theme.editor.backgroundcolor};
    }
    color: ${(props) => props.theme.navbar.textcolor};
    border: ${(props) => props.theme.navbar.border};
    border-radius: 5px;
    cursor: pointer;
    width: 3rem;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    svg {
        width: 25px;
        height: 25px;
    }
`;

const NavItems: FC<INavItems> = ({ icon, onClick, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClick ? onClick : () => setOpen(!open)}
            >
                {icon}
            </Li>
            <AnimatePresence exitBeforeEnter={true}>{open && children}</AnimatePresence>
        </>
    );
};

export default NavItems;
