import React, { useEffect, useState } from "react";

const Todolist = () => {
    const USER = "YoannisRP"; 
    const URL = `https://playground.4geeks.com/todo/todos/${USER}`;
    const USER_URL = `https://playground.4geeks.com/todo/users/${USER}`;

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    
    const createUser = async () => {
        try {
            await fetch(USER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });
        } catch (error) {
            console.error("Error creando usuario:", error);
        }
    };

    
    const getTasks = async () => {
        try {
            const resp = await fetch(URL);
            const data = await resp.json();

  
            setTasks(data.todos || []);
        } catch (error) {
            console.error("Error obteniendo tareas:", error);
        }
    };

    
    const addTask = async (e) => {
        if (e.key !== "Enter" || newTask.trim() === "") return;

        const task = {
            label: newTask,
            is_done: false
        };

        try {
            await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            });

            setNewTask("");
            getTasks();
        } catch (error) {
            console.error("Error agregando tarea:", error);
        }
    };

    
    const deleteTask = async (id) => {
        try {
            await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE"
            });
            getTasks();
        } catch (error) {
            console.error("Error eliminando tarea:", error);
        }
    };

    
    const deleteAll = async () => {
        try {
            await fetch(USER_URL, { method: "DELETE" });
            getTasks();
        } catch (error) {
            console.error("Error eliminando todas las tareas:", error);
        }
    };

    
    useEffect(() => {
        createUser().then(() => getTasks());
    }, []);

    return (
        <div className="container">
            <h1 className="text-center mt-4">TODO List con Fetch</h1>

            <input
                type="text"
                className="form-control mt-3"
                placeholder="Escribe una tarea y presiona Enter"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={addTask}
            />

            <ul className="list-group mt-3">
                {tasks.map((task) => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between">
                        {task.label}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteTask(task.id)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>

            <button className="btn btn-warning mt-3" onClick={deleteAll}>
                Borrar todas las tareas
            </button>
        </div>
    );
};

export default Todolist;
