import React, { FC } from "react";
import styled from "styled-components";

const Ul = styled.ul`
    text-decoration: none;
    list-style: none;
    background-color: ${(props) => props.theme.main.secondarycolor};
`;

const TodoList: FC = ({ children }) => {
    return <Ul>{children}</Ul>;
};

export default TodoList;
