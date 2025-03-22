import React, { useState, useEffect } from "react";
import axios from "axios";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/api/";
const TASKS_URL = `${BACKEND_URL}tasks`;

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(TASKS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { status, search },
        });

        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error(`ERROR: Getting the tasks: ${error}`);
      }
    };

    getTasks();
  }, [token, status, search]);

  return (
    <div>
      <div>
        <label>Estado: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">Pendiente</option>
          <option value="completada">Completado</option>
        </select>
      </div>

      <div>
        <label>Buscar: </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="taskCard">
              <h3>{task.Titulo}</h3>
              <p>{task.Estado}</p>
              {/* <DatePicker selected={new Date(task.dueDate)} /> */}
              <input type="text" value={task.Descripcion} />
              {/* <button onClick={() => handleDelete(task.id)}>Eliminar</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
