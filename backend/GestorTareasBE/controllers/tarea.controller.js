const { Task } = require("../models");

exports.CrearTarea = async (req, res) => {
  try {
    // Estado (pendiente, en progreso, completada).
    req.body.Estado = "pendiente";
    const tarea = await Task.create(req.body);
    res.status(201).send(tarea);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema creando la tarea. ${error}` });
  }
};

exports.ObtenerTareas = async (req, res) => {
  try {
    const tareas = await Task.findAll();
    res.status(200).send(tareas);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo las tareas. ${error}` });
  }
};

exports.ObtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Task.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).send({ message: "Tarea no encontrada." });
    } else {
      return res.status(200).send(tarea);
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo la tarea. ${error}` });
  }
};

exports.ActualizarTarea = async (req, res) => {
  try {
    if (req.body.Estado) {
      if (
        req.body.Estado !== "pendiente" &&
        req.body.Estado !== "en progreso" &&
        req.body.Estado !== "completada"
      ) {
        return res.status(400).send({ message: "Estado inválido." });
      }
    } else {
      return res.status(400).send({ message: "Estado es requerido." });
    }

    req.body.Estado = req.body.Estado.trim().toLowerCase();
    const tarea = await Task.findByPk(req.params.id);

    if (!tarea) {
      return res.status(404).send({ message: "Tarea no encontrada." });
    } else {
      if (tarea.Estado === "completada") {
        return res.status(400).send({
          message:
            "No se puede modificar una tarea completada, solo eliminarla.",
        });
      }

      if (tarea.Estado === "pendiente" && req.body.Estado === "completada") {
        return res.status(400).send({
          message:
            "No se puede completar una tarea pendiente, debe ponerse en progreso.",
        });
      }

      if (tarea.Estado === "en progreso" && req.body.Estado === "pendiente") {
        return res.status(400).send({
          message:
            "No se puede poner en pendiente una tarea en progreso, debe completarla.",
        });
      }

      await tarea.update(req.body);
      return res.status(200).send(tarea);
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema actualizando la tarea. ${error}` });
  }
};

exports.EliminarTarea = async (req, res) => {
  try {
    const tarea = await Task.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).send({ message: "Tarea no encontrada." });
    } else {
      await tarea.destroy();
      return res.status(200).send({ message: "Tarea eliminada." });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema eliminando la tarea. ${error}` });
  }
};

exports.ObtenerTareasPorUsuario = async (req, res) => {
  try {
    const tareas = await Task.findAll({
      where: { UsuarioId: req.params.id },
    });
    res.status(200).send(tareas);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo las tareas. ${error}` });
  }
};

exports.ObtenerTareasPorUsuarioEstadoYFecha = async (req, res) => {
  try {
    const tareas = await Task.findAll({
      where: { UsuarioId: req.params.id },
    }).filter((tarea) => {
      return (
        EsEstadoValido(req.params.Estado, tarea) &&
        EsFechaValida(req.params.Estado, tarea) &&
        EsTituloValido(req.params.Titulo, tarea) &&
        EsDescripcionValida(req.params.Descripcion, tarea)
      );
    });

    res.status(200).send(tareas);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo las tareas. ${error}` });
  }
};

function EsEstadoValido(estado, tarea) {
  return !estado || estado.trim() || tarea.Estado === estado;
}

function EsFechaValida(fecha, tarea) {
  return !fecha || fecha.trim() || tarea.FechaLimite <= fecha;
}

function EsTituloValido(titulo, tarea) {
  return (
    !titulo ||
    titulo.trim() ||
    tarea.titulo.toLowerCase().includes(titulo.toLowerCase())
  );
}

function EsDescripcionValida(descripcion, tarea) {
  return (
    !descripcion ||
    descripcion.trim() ||
    tarea.Titulo.toLowerCase().includes(descripcion.toLowerCase())
  );
}
