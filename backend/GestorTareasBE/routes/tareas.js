const express = require("express");
const router = express.Router();
const {
  CrearTarea,
  ObtenerTareas,
  ObtenerTareaPorId,
  ActualizarTarea,
  EliminarTarea,
  ObtenerTareasPorUsuario,
} = require("../controllers/tarea.controller");
const rutaTareas = "/tasks";

//Rutas de tareas
router.post(`${rutaTareas}`, CrearTarea);
router.get(`${rutaTareas}`, ObtenerTareas);
router.get(`${rutaTareas}/:id`, ObtenerTareaPorId);
router.get(`${rutaTareas}/:id`, ObtenerTareasPorUsuario);
router.put(`${rutaTareas}/:id`, ActualizarTarea);
router.delete(`${rutaTareas}/:id`, EliminarTarea);

module.exports = router;
