import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { LuCoffee, LuHeart } from "react-icons/lu";
import TodoCard from "./components/TodoCard";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [doneTodos, setDoneTodos] = useState([]);
    const [inProgressTodos, setInProgressTodos] = useState([]);

    // Toastify
    const editToast = () => toast.success("Todo edited!", { position: "top-center" });
    const deleteToast = () => toast.error("Todo deleted!", { position: "top-center" });
    const doneToast = () => toast.success("Todo marked as done!", { position: "top-center" });
    const progressToast = () => toast.warning("Todo marked as active!", { position: "top-center" });
    const removeProgressToast = () => toast.warning("Todo removed from active!", { position: "top-center" });
    const undoDoneToast = () => toast.warning("Completed todo undone!", { position: "top-center" });
    const todoAddedToast = () => toast.success("Todo added!", { position: "top-center" });

    // Get todos from local storage on page load
    // Use effect runs once on page load with empty array as second argument
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
        // Prevent page refresh
        event.preventDefault();

        // If input is empty, return
        if (event.target[0].value.trim().length === 0 || event.target[0].value === "") {
            return;
        }

        // Create new todo object with random id and title from input
        const newTodo = {
            id: Math.random(),
            title: event.target[0].value.trim(),
            status: "todo",
        };

        // Add new todo to todos array and local storage
        setTodos([...todos, newTodo]);
        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

        // Clear input
        event.target[0].value = "";

        // Toastify
        todoAddedToast();
    };

    // IN PROGRESS TODO
    const inProgressTodo = (id, status) => {
        // If todo is in progress, move it to todo
        if (status === "inProgress") {
            const getTodo = inProgressTodos.find((todo) => todo.id === id);
            const updatedInProgressTodos = inProgressTodos.filter((todo) => todo.id !== id);

            // Update todo status
            const updatedTodo = {
                ...getTodo,
                status: "todo",
            };

            // Update state and local storage
            setInProgressTodos(updatedInProgressTodos);
            setTodos([...todos, updatedTodo]);
            localStorage.setItem("todos", JSON.stringify([...todos, updatedTodo]));
            localStorage.setItem("inProgressTodos", JSON.stringify(updatedInProgressTodos));

            // Toastify
            removeProgressToast();

            return;
        }

        // If todo is todo, move it to in progress
        if (status === "todo") {
            // Get todo from todos array
            const getTodo = todos.find((todo) => todo.id === id);
            const updatedTodos = todos.filter((todo) => todo.id !== id);

            // Update todo status
            const updatedTodo = {
                ...getTodo,
                status: "inProgress",
            };

            // Update state and local storage
            setTodos(updatedTodos);
            setInProgressTodos([...inProgressTodos, updatedTodo]);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            localStorage.setItem("inProgressTodos", JSON.stringify([...inProgressTodos, updatedTodo]));

            // Toastify
            progressToast();

            return;
        }
    };

    // DELETE TODO
    const deleteTodo = (id, status) => {
        // Handle deletion based on status of todos
        if (status === "done") {
            const updatedDoneTodos = doneTodos.filter((todo) => todo.id !== id);
            setDoneTodos(updatedDoneTodos);
            localStorage.setItem("doneTodos", JSON.stringify(updatedDoneTodos));

            // Toastify
            deleteToast();

            return;
        }

        if (status === "inProgress") {
            const updatedInProgressTodos = inProgressTodos.filter((todo) => todo.id !== id);
            setInProgressTodos(updatedInProgressTodos);
            localStorage.setItem("inProgressTodos", JSON.stringify(updatedInProgressTodos));

            // Toastify
            deleteToast();

            return;
        }

        // Update todos array and local storage
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        // Toastify
        deleteToast();
    };

    // DONE TODO
    const completeTodo = (id, status) => {
        // If todo is in progress, move it to done
        if (status === "inProgress") {
            const getTodo = inProgressTodos.find((todo) => todo.id === id);
            const updatedInProgressTodos = inProgressTodos.filter((todo) => todo.id !== id);

            // Update todo status
            const updatedTodo = {
                ...getTodo,
                status: "done",
            };

            // Update state and local storage
            setInProgressTodos(updatedInProgressTodos);
            setDoneTodos([...doneTodos, updatedTodo]);
            localStorage.setItem("inProgressTodos", JSON.stringify(updatedInProgressTodos));
            localStorage.setItem("doneTodos", JSON.stringify([...doneTodos, updatedTodo]));

            // Toastify
            doneToast();

            return;
        }

        // If todo is todo, move it to done
        if (status === "todo") {
            const getTodo = todos.find((todo) => todo.id === id);
            const updatedTodos = todos.filter((todo) => todo.id !== id);

            // Update todo status
            const updatedTodo = {
                ...getTodo,
                status: "done",
            };

            // Update state and local storage
            setTodos(updatedTodos);
            setDoneTodos([...doneTodos, updatedTodo]);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            localStorage.setItem("doneTodos", JSON.stringify([...doneTodos, updatedTodo]));

            // Toastify
            doneToast();
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

            // Toastify
            undoDoneToast();

            return;
        }
    };

    // EDIT TODO
    const editTodo = (id, newValue, status) => {
        console.log(id, newValue, status);
        // Check status of todo to determine which array to update
        if (status === "done") {
            // Find the todo to edit
            const findTodo = doneTodos.find((todo) => todo.id === id);

            // Update todo title
            findTodo.title = newValue;

            // Update todos array and local storage
            const updatedDoneTodos = [...doneTodos];
            setDoneTodos(updatedDoneTodos);
            localStorage.setItem("doneTodos", JSON.stringify(updatedDoneTodos));

            // Toastify
            editToast();

            return;
        }

        if (status === "inProgress") {
            // Find the todo to edit
            const findTodo = inProgressTodos.find((todo) => todo.id === id);

            // Update todo title
            findTodo.title = newValue;

            // Update todos array and local storage
            const updatedInProgressTodos = [...inProgressTodos];
            setInProgressTodos(updatedInProgressTodos);
            localStorage.setItem("inProgressTodos", JSON.stringify(updatedInProgressTodos));

            // Toastify
            editToast();

            return;
        }

        // Find the todo to edit
        const findTodo = todos.find((todo) => todo.id === id);

        // Update todo title
        findTodo.title = newValue;

        // Update todos array and local storage
        const updatedTodos = [...todos];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        // Toastify
        editToast();

        return;
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />

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
                                        edit={editTodo}
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
                                            edit={editTodo}
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
                                        <TodoCard
                                            key={todo.id}
                                            todo={todo}
                                            remove={deleteTodo}
                                            done={completeTodo}
                                            edit={editTodo}
                                        />
                                    ))
                                ) : (
                                    <p>No completed todos.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    Made with <LuHeart className="heart" size={20} /> and <LuCoffee className="coffee" size={20} /> by{" "}
                    <a href="https://github.com/latham91">Aaron Latham</a>
                </footer>
            </div>
        </>
    );
}
