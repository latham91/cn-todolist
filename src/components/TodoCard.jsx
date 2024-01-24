import "./TodoCard.css";
import { LuTrash2, LuCheckCircle, LuUndo2 } from "react-icons/lu";
import PropTypes from "prop-types";
import { useState } from "react";

export default function TodoCard({ todo, remove, done, progress }) {
    const [deleteTooltip, setDeleteTooltip] = useState(false);
    const [doneTooltip, setDoneTooltip] = useState(false);
    const [inProgTooltip, setInProgTooltip] = useState(false);

    // Animations
    const [fadeOut, setFadeOut] = useState(false);
    const [slideRight, setSlideRight] = useState(false);
    const [slideToBr, setSlideToBr] = useState(false);
    const [slideToBottom, setSlideToBottom] = useState(false);
    const [slideToLeft, setSlideToLeft] = useState(false);

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

    const handleDelete = () => {
        setFadeOut(true);

        setTimeout(() => {
            remove(todo.id, todo.status);
        }, 650);
    };

    const handleInProgress = () => {
        if (todo.status === "inProgress") {
            setSlideToLeft(true);

            setTimeout(() => {
                progress(todo.id, todo.status);
            }, 650);
            return;
        }

        setSlideRight(true);

        setTimeout(() => {
            progress(todo.id, todo.status);
        }, 650);
    };

    const handleComplete = () => {
        if (todo.status === "inProgress") {
            setSlideToBottom(true);

            setTimeout(() => {
                done(todo.id, todo.status);
            }, 650);
            return;
        }

        if (todo.status === "done") {
            setSlideToLeft(true);

            setTimeout(() => {
                done(todo.id, todo.status);
            }, 650);
            return;
        }

        setSlideToBr(true);

        setTimeout(() => {
            done(todo.id, todo.status);
        }, 650);
    };

    return (
        <div
            className={`todoItem ${fadeOut ? "fadeOutAnim" : ""} ${slideRight ? "slideRightAnim fadeOutAnim" : ""} ${
                slideToBr ? "slideToBrAnim fadeOutAnim" : ""
            } ${slideToBottom ? "slideToBottomAnim fadeOutAnim" : ""} ${
                slideToLeft ? "slideToLeftAnim fadeOutAnim" : ""
            }`}
        >
            <div className="todoTitle">
                {todo.status != "done" && (
                    <div className="inProgContainer">
                        <input
                            onMouseEnter={() => handleTooltip("inProg")}
                            onMouseLeave={() => setInProgTooltip(false)}
                            onChange={handleInProgress}
                            type="checkbox"
                            checked={todo.status === "inProgress"}
                        />
                        {inProgTooltip && (
                            <div className="tooltipInProg">
                                <span className="tooltiptext">
                                    {todo.status === "inProgress" ? "Remove active" : "Make active"}
                                </span>
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
                    onClick={handleDelete}
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
                    onClick={handleComplete}
                    className="btnDone"
                >
                    {todo.status === "done" ? <LuUndo2 size={20} /> : <LuCheckCircle size={20} />}

                    {doneTooltip && (
                        <div className="tooltip">
                            <span className="tooltiptext">
                                {todo.status === "done" ? "Undo complete" : "Mark completed"}
                            </span>
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
