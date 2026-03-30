import React, { useState } from "react";

const Todolist = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            setTasks([...tasks, task]);
            setTask("");
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h1 className="mb-4">Todolist</h1>

            <input
                type="text"
                className="form-control"
                placeholder="Añadir tarea"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <ul className="list-group mt-3">
                {tasks.length === 0 ? (
                    <li className="list-group-item text-muted">
                        No hay tareas, añadir tareas
                    </li>
                ) : (
                    tasks.map((t, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center task-item"
                        >
                            {t}
                            <span
                                className="delete-btn text-danger"
                                onClick={() => deleteTask(index)}
                            >
                                ✖
                            </span>
                        </li>
                    ))
                )}
            </ul>

            <p className="mt-3 text-muted">
                {tasks.length} tareas pendientes
            </p>
        </div>
    );
};

export default Todolist;
