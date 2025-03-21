import React, { useState, useEffect } from "react";
import axios from "axios";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001/api/";
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

        setTasks(response.data);
      } catch (error) {
        console.error(`ERROR: Getting the tasks: ${error}`);
      }
    };

    getTasks();
  }, [token, status, search]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(
  //       "http://localhost:3001/tasks",
  //       { description: newTask },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setNewTask("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/tasks/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setTasks(tasks.filter((task) => task.id !== id));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
            <div class="taskCard">
              <h3>{task.description}</h3>
              <p>{task.status}</p>
              {/* <DatePicker selected={new Date(task.dueDate)} /> */}
              <input type="text" value={task.description} />
              {/* <button onClick={() => handleDelete(task.id)}>Eliminar</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>

    // <div>
    //   <h2>Tareas</h2>
    //   <ul>
    //     {tasks.map((task) => (
    //       <li key={task.id}>
    //         {task.description}
    //         <button onClick={() => handleDelete(task.id)}>Eliminar</button>
    //       </li>
    //     ))}
    //   </ul>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={newTask}
    //       onChange={(e) => setNewTask(e.target.value)}
    //     />
    //     <button type="submit">Agregar</button>
    //   </form>
    // </div>
  );
};

export default Tasks;
