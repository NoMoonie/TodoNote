import React, { FC, useEffect, useState } from "react";
import Todo from "../Components/Todos/Todo";
import TodoList from "../Components/Todos/TodoList";
import IPage from "../Interfaces/page";

const Home: FC<IPage> = (props) => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        fetch("https://localhost:5001/api/Todo")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTodo(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <TodoList>
                {todo.map((item: any) => {
                    return <Todo key={item.id} isComplete={item.isComplete} title={item.title} />;
                })}
            </TodoList>
        </div>
    );
};

export default Home;
