import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
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

  const handleSave = async (task) => {
    try {
      await axios.put(
        `${TASKS_URL}/${task.id}`,
        {
          Titulo: task.Titulo,
          Descripcion: task.description,
          Estado: task.Estado,
          FechaLimite: task.FechaLimite,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Tarea guardada.");
    } catch (error) {
      console.error(`ERROR: Error guardando la tarea ${task.id}: ${error}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${TASKS_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(`ERROR: Error eliminando la tarea ${id}: ${error}`);
    }
  };

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
              <div>
                <select
                  value={task.Estado}
                  onChange={(e) => (task.Estado = e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">Pendiente</option>
                  <option value="completada">Completado</option>
                </select>

                <DatePicker selected={new Date(task.FechaLimite)} />
              </div>
              <input type="text" value={task.Descripcion} />
              <div>
                <button onClick={() => handleSave(task)}>Guardar</button>
                <button onClick={() => handleDelete(task)}>Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
