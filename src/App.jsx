import "./App.css";
import { useState, useEffect } from "react";
import TodoCard from "./components/TodoCard";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [doneTodos, setDoneTodos] = useState([]);
    const [inProgressTodos, setInProgressTodos] = useState([]);

    // Get todos from local storage on page load
    useEffect(() => {
        const getTodos = localStorage.getItem("todos");
        const getDoneTodos = localStorage.getItem("doneTodos");
        const getInProgressTodos = localStorage.getItem("inProgressTodos");

        if (getTodos) {
            setTodos(JSON.parse(getTodos));
        }

        if (getDoneTodos) {
            setDoneTodos(JSON.parse(getDoneTodos));
        }

        if (getInProgressTodos) {
            setInProgressTodos(JSON.parse(getInProgressTodos));
        }
    }, []);

    // ADD TODO
    const addTodo = (event) => {
        event.preventDefault();

        if (event.target[0].value.trim().length === 0 || event.target[0].value === "") {
            return;
        }

        const newTodo = {
            id: Math.random(),
            title: event.target[0].value.trim(),
            status: "todo",
        };

        setTodos([...todos, newTodo]);
        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

        event.target[0].value = "";
    };

    // IN PROGRESS TODO
    const inProgressTodo = (id, status) => {
        // If todo is in progress, move it to todo
        if (status === "inProgress") {
            const getTodo = inProgressTodos.find((todo) => todo.id === id);
            const updatedInProgressTodos = inProgressTodos.filter((todo) => todo.id !== id);

            const updatedTodo = {
                ...getTodo,
                status: "todo",
            };

            setInProgressTodos(updatedInProgressTodos);
            setTodos([...todos, updatedTodo]);
            localStorage.setItem("todos", JSON.stringify([...todos, updatedTodo]));
            localStorage.setItem("inProgressTodos", JSON.stringify(updatedInProgressTodos));
            return;
        }

        // If todo is todo, move it to in progress
        if (status === "todo") {
            const getTodo = todos.find((todo) => todo.id === id);
            const updatedTodos = todos.filter((todo) => todo.id !== id);

            const updatedTodo = {
                ...getTodo,
                status: "inProgress",
            };

            setTodos(updatedTodos);
            setInProgressTodos([...inProgressTodos, updatedTodo]);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            localStorage.setItem("inProgressTodos", JSON.stringify([...inProgressTodos, updatedTodo]));
            return;
        }
    };

    // DELETE TODO
    const deleteTodo = (id, status) => {
        if (status === "done") {
            const updatedDoneTodos = doneTodos.filter((todo) => todo.id !== id);
            setDoneTodos(updatedDoneTodos);
            localStorage.setItem("doneTodos", JSON.stringify(updatedDoneTodos));
            return;
        }

        if (status === "inProgress") {
            const updatedInProgressTodos = inProgressTodos.filter((todo) => todo.id !== id);
            setInProgressTodos(updatedInProgressTodos);
            localStorage.setItem("inProgressTodos", JSON.stringify(updatedInProgressTodos));
            return;
        }

        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    // DONE TODO
    const completeTodo = (id, status) => {
        // If todo is in progress, move it to done
        if (status === "inProgress") {
            const getTodo = inProgressTodos.find((todo) => todo.id === id);
            const updatedInProgressTodos = inProgressTodos.filter((todo) => todo.id !== id);

            const updatedTodo = {
                ...getTodo,
                status: "done",
            };

            setInProgressTodos(updatedInProgressTodos);
            setDoneTodos([...doneTodos, updatedTodo]);
            localStorage.setItem("inProgressTodos", JSON.stringify(updatedInProgressTodos));
            localStorage.setItem("doneTodos", JSON.stringify([...doneTodos, updatedTodo]));
            return;
        }

        // If todo is todo, move it to done
        if (status === "todo") {
            const getTodo = todos.find((todo) => todo.id === id);
            const updatedTodos = todos.filter((todo) => todo.id !== id);

            const updatedTodo = {
                ...getTodo,
                status: "done",
            };

            setTodos(updatedTodos);
            setDoneTodos([...doneTodos, updatedTodo]);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            localStorage.setItem("doneTodos", JSON.stringify([...doneTodos, updatedTodo]));
            return;
        }

        // If todo is done, move it to todo
        if (status === "done") {
            const getTodo = doneTodos.find((todo) => todo.id === id);
            const updatedDoneTodos = doneTodos.filter((todo) => todo.id !== id);

            const updatedTodo = {
                ...getTodo,
                status: "todo",
            };

            setDoneTodos(updatedDoneTodos);
            setTodos([...todos, updatedTodo]);
            localStorage.setItem("doneTodos", JSON.stringify(updatedDoneTodos));
            localStorage.setItem("todos", JSON.stringify([...todos, updatedTodo]));
            return;
        }
    };

    // EDIT TODO:
    // const editTodo = (id) => {
    //     const getTodo = todos.find((todo) => todo.id === id);
    // };

    return (
        <div className="App">
            <div className="container">
                <div className="left">
                    <div className="leftHeader">
                        <h2>TODO LIST</h2>
                        <span className="todoCount">{todos.length}</span>
                    </div>
                    <form onSubmit={addTodo}>
                        <input type="text" placeholder="Enter a todo" />
                        <button type="submit">Add</button>
                    </form>

                    <div className="todoList">
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    remove={deleteTodo}
                                    done={completeTodo}
                                    progress={inProgressTodo}
                                />
                            ))
                        ) : (
                            <p>No todos yet. Try adding one.</p>
                        )}
                    </div>
                </div>
                <div className="right">
                    <div className="rightTop">
                        <div className="rightTopHeader">
                            <h2>IN PROGRESS</h2>
                            <span className="inProgCount">{inProgressTodos.length}</span>
                        </div>

                        <div className="inProgressList">
                            {inProgressTodos.length > 0 ? (
                                inProgressTodos.map((todo) => (
                                    <TodoCard
                                        key={todo.id}
                                        todo={todo}
                                        remove={deleteTodo}
                                        done={completeTodo}
                                        progress={inProgressTodo}
                                    />
                                ))
                            ) : (
                                <p>No todos in progress.</p>
                            )}
                        </div>
                    </div>
                    <div className="rightBottom">
                        <div className="rightHeader">
                            <h2>COMPLETED</h2>
                            <span className="doneCount">{doneTodos.length}</span>
                        </div>

                        <div className="completedList">
                            {doneTodos.length > 0 ? (
                                doneTodos.map((todo) => (
                                    <TodoCard key={todo.id} todo={todo} remove={deleteTodo} done={completeTodo} />
                                ))
                            ) : (
                                <p>No completed todos.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
