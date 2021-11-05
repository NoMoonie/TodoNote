import React from "react";
import styled from "styled-components";
import { FaBold } from "react-icons/fa";
import { GrTextAlignCenter, GrTextAlignLeft, GrTextAlignRight } from "react-icons/gr";

const Ul = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
`;

const Li = styled.li`
    :hover {
        background-color: ${(props) => props.theme.main.editor.backgroundcolor};
    }
    cursor: pointer;
    width: 2rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ToolBar = () => {
    return (
        <Ul>
            <Li>
                <FaBold />
            </Li>
            <Li>
                <GrTextAlignLeft />
            </Li>
            <Li>
                <GrTextAlignCenter />
            </Li>
            <Li>
                <GrTextAlignRight />
            </Li>
        </Ul>
    );
};
