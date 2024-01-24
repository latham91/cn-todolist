import "./TodoCard.css";
import { LuTrash2, LuCheckCircle, LuUndo2 } from "react-icons/lu";
import PropTypes from "prop-types";
import { useState } from "react";

export default function TodoCard({ todo, remove, done, progress }) {
    const [deleteTooltip, setDeleteTooltip] = useState(false);
    const [doneTooltip, setDoneTooltip] = useState(false);
    const [inProgTooltip, setInProgTooltip] = useState(false);

    const handleTooltip = (type) => {
        if (type === "delete") {
            setDeleteTooltip((currVal) => !currVal);
        }

        if (type === "done") {
            setDoneTooltip((currVal) => !currVal);
        }

        if (type === "inProg") {
            setInProgTooltip((currVal) => !currVal);
        }
    };
    return (
        <div className="todoItem">
            <div className="todoTitle">
                {todo.status != "done" && (
                    <div className="inProgContainer">
                        <input
                            onMouseEnter={() => handleTooltip("inProg")}
                            onMouseLeave={() => setInProgTooltip(false)}
                            onChange={() => progress(todo.id, todo.status)}
                            type="checkbox"
                            checked={todo.status === "inProgress"}
                        />
                        {inProgTooltip && (
                            <div className="tooltipInProg">
                                <span className="tooltiptext">Make active</span>
                            </div>
                        )}
                    </div>
                )}
                <span>{todo.title}</span>
            </div>
            <div className="todoButtons">
                <button
                    onMouseEnter={() => handleTooltip("delete")}
                    onMouseLeave={() => setDeleteTooltip(false)}
                    onClick={() => remove(todo.id, todo.status)}
                    className="btnDelete"
                >
                    <LuTrash2 size={20} />

                    {deleteTooltip && (
                        <div className="tooltip">
                            <span className="tooltiptext">Delete todo</span>
                        </div>
                    )}
                </button>
                <button
                    onMouseEnter={() => handleTooltip("done")}
                    onMouseLeave={() => setDoneTooltip(false)}
                    onClick={() => done(todo.id, todo.status)}
                    className="btnDone"
                >
                    {todo.status === "done" ? <LuUndo2 size={20} /> : <LuCheckCircle size={20} />}

                    {doneTooltip && (
                        <div className="tooltip">
                            <span className="tooltiptext">Mark complete</span>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}

TodoCard.propTypes = {
    todo: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    done: PropTypes.func,
    progress: PropTypes.func,
};
