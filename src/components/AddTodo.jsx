import "./AddTodo.css";
import PropTypes from "prop-types";

export default function AddTodo({ addTodo }) {
    return (
        <form onSubmit={addTodo}>
            <input type="text" placeholder="Enter a todo" />
            <button type="submit">Add</button>
        </form>
    );
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
};
