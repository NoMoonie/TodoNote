import React, { FC } from "react";
import styled from "styled-components";

const Ul = styled.ul`
    text-decoration: none;
    list-style: none;
    margin: 1.5em;
`;

const TodoList: FC = ({ children }) => {
    return <Ul>{children}</Ul>;
};

export default TodoList;
