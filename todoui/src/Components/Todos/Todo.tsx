import React, { FC } from "react";
import styled from "styled-components";
import ITodo from "../../Interfaces/todos";

const Li = styled.li<{ isComplete?: boolean }>`
    color: ${(props) => (props.isComplete ? props.theme.main.complete : props.theme.main.notcomplete)};
`;

const Todo: FC<ITodo> = ({ title, isComplete }) => {
    return <Li isComplete={isComplete}>{title}</Li>;
};

export default Todo;
