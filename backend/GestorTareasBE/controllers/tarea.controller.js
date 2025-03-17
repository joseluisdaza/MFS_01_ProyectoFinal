const { Tarea } = require("../models");

exports.CrearTarea = async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).send(tarea);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema creando la tarea. ${error}` });
  }
};

exports.ObtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.status(200).send(tareas);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo las tareas. ${error}` });
  }
};

exports.ObtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
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
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).send({ message: "Tarea no encontrada." });
    } else {
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
    const tarea = await Tarea.findByPk(req.params.id);
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
    const tareas = await Tarea.findAll({
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
    const tareas = await Tarea.findAll({
      where: { UsuarioId: req.params.id },
    }).filter((tarea) => {
      return (
        EsEstadoValido(req.params.estado, tarea) &&
        EsFechaValida(req.params.estado, tarea) &&
        EsTituloValido(req.params.titulo, tarea) &&
        EsDescripcionValida(req.params.descripcion, tarea)
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
  return !estado || estado.trim() || tarea.Estado === req.estado;
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
    tarea.titulo.toLowerCase().includes(descripcion.toLowerCase())
  );
}
