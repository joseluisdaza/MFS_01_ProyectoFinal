import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Tasks.css";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/api/";
const TASKS_URL = `${BACKEND_URL}tasks`;

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({
    Titulo: "",
    Descripcion: "",
    Estado: "pendiente",
    FechaLimite: new Date(),
  });

  const getTasks = async () => {
    try {
      const response = await axios.get(TASKS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { status, search },
      });

      setTasks(response.data);
    } catch (error) {
      console.error(`ERROR: Getting the tasks: ${error}`);
    }
  };

  useEffect(() => {
    getTasks();
  }, [token, status, search]);

  const handleSave = async (task) => {
    try {
      await axios.put(
        `${TASKS_URL}/${task.id}`,
        {
          title: task.Titulo,
          description: task.Descripcion,
          status: task.Estado,
          dueDate: task.FechaLimite,
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

      // setTasks(tasks.filter((task) => task.id !== id));
      getTasks();
    } catch (error) {
      console.error(`ERROR: Error eliminando la tarea ${id}: ${error}`);
    }
  };

  const handleAgregar = async () => {
    try {
      const response = await axios.post(
        TASKS_URL,
        {
          title: newTask.Titulo,
          description: newTask.Descripcion,
          status: newTask.Estado,
          dueDate: newTask.FechaLimite.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks([...tasks, response.data]);
      setNewTask({
        Titulo: "",
        Descripcion: "",
        Estado: "pendiente",
        FechaLimite: new Date(),
      });
      alert("Tarea agregada.");
    } catch (error) {
      console.error(`ERROR: Error agregando la tarea: ${error}`);
    }
  };

  const handleNewTaskChange = (field, value) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleTaskChange = (id, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  return (
    <div className="tasks-container">
      <div className="filter-container">
        <label>Estado: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
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

      <div className="new-task-container">
        <h3>Agregar Nueva Tarea</h3>
        <input
          type="text"
          placeholder="Título"
          value={newTask.Titulo}
          onChange={(e) => handleNewTaskChange("Titulo", e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={newTask.Descripcion}
          onChange={(e) => handleNewTaskChange("Descripcion", e.target.value)}
        />
        <select
          value={newTask.Estado}
          onChange={(e) => handleNewTaskChange("Estado", e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completado</option>
        </select>
        <DatePicker
          selected={newTask.FechaLimite}
          onChange={(date) => handleNewTaskChange("FechaLimite", date)}
        />
        <button onClick={handleAgregar}>Agregar</button>
      </div>

      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <input
              type="text"
              value={task.Titulo}
              onChange={(e) =>
                handleTaskChange(task.id, "Titulo", e.target.value)
              }
            />
            <div>
              <select
                value={task.Estado}
                onChange={(e) =>
                  handleTaskChange(task.id, "Estado", e.target.value)
                }
              >
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completada">Completado</option>
              </select>

              <DatePicker
                selected={new Date(task.FechaLimite)}
                onChange={(date) =>
                  handleTaskChange(task.id, "FechaLimite", date)
                }
              />
            </div>
            <textarea
              value={task.Descripcion}
              onChange={(e) =>
                handleTaskChange(task.id, "Descripcion", e.target.value)
              }
            />
            <div>
              <button onClick={() => handleSave(task)}>Guardar</button>
              <button onClick={() => handleDelete(task.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
