const { where, Op } = require("sequelize");
const { Task } = require("../models");
const excludedFields = ["createdAt", "updatedAt"];

exports.CrearTarea = async (req, res) => {
  try {
    // Estado (pendiente, en progreso, completada).
    const tarea = await Task.create({
      Titulo: req.body.title,
      Descripcion: req.body.description,
      Estado: "pendiente",
      FechaLimite: req.body.dueDate,
      UsuarioId: req.usuario.id,
    });

    res.status(201).send({
      message: "Tarea creada exitosamente.",
      task: {
        id: tarea.id,
        title: tarea.Titulo,
        description: tarea.Descripcion,
        status: tarea.Estado,
        dueDate: tarea.FechaLimite,
        userId: tarea.UsuarioId,
      },
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema creando la tarea. ${error}` });
  }
};

exports.ObtenerTareas = async (req, res) => {
  try {
    const { status, search } = req.query;
    const whereClause = { UsuarioId: req.usuario.id };

    if (status) {
      whereClause.Estado = status;
    }

    if (search) {
      whereClause[Op.or] = [
        { Titulo: { [Op.like]: `%${search}%` } },
        { Descripcion: { [Op.like]: `%${search}%` } },
      ];
    }

    const tareas = await Task.findAll({
      where: whereClause,
      attributes: { exclude: excludedFields },
    });

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
    if (!tarea || tarea.UsuarioId !== req.usuario.id) {
      return res.status(404).send({ message: "Tarea no encontrada." });
    } else {
      return res.status(200).send({
        title: tarea.Titulo,
        description: tarea.Descripcion,
        status: tarea.Estado,
        dueDate: tarea.FechaLimite,
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo la tarea. ${error}` });
  }
};

exports.ActualizarTarea = async (req, res) => {
  try {
    taskStatus = req.body.status;
    dueDate = req.body.dueDate;
    title = req.body.title;
    description = req.body.description;

    if (taskStatus) {
      taskStatus = taskStatus.trim().toLowerCase();
      if (
        taskStatus !== "pendiente" &&
        taskStatus !== "en progreso" &&
        taskStatus !== "completada"
      ) {
        return res.status(400).send({ message: "Estado inválido." });
      }
    } else {
      return res.status(400).send({ message: "Estado es requerido." });
    }

    const tarea = await Task.findByPk(req.params.id);

    if (!tarea || tarea.UsuarioId !== req.usuario.id) {
      return res.status(404).send({ message: "Tarea no encontrada." });
    } else {
      if (tarea.Estado === "completada") {
        return res.status(400).send({
          message:
            "No se puede modificar una tarea completada, solo eliminarla.",
        });
      }

      if (tarea.Estado === "pendiente" && taskStatus === "completada") {
        return res.status(400).send({
          message:
            "No se puede completar una tarea pendiente, debe ponerse en progreso.",
        });
      }

      if (tarea.Estado === "en progreso" && taskStatus === "pendiente") {
        return res.status(400).send({
          message:
            "No se puede poner en pendiente una tarea en progreso, debe completarla.",
        });
      }

      await tarea.update({
        Estado: taskStatus,
        FechaLimite: dueDate,
        Titulo: title,
        Descripcion: description,
        UsuarioId: req.usuario.id,
      });

      return res.status(200).send({
        message: "Tarea actualizada exitosamente.",
        task: {
          id: tarea.id,
          title: tarea.Titulo,
          description: tarea.Descripcion,
          status: tarea.Estado,
          dueDate: tarea.FechaLimite,
          userId: tarea.UsuarioId,
        },
      });
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

    if (!tarea || tarea.UsuarioId !== req.usuario.id) {
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
