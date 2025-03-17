const express = require("express");
const router = express.Router();
const {
  CrearTarea,
  ObtenerTareas,
  ObtenerTareaPorId,
  ActualizarTarea,
  EliminarTarea,
} = require("../controllers/tarea.controller");
const rutaTareas = "/tareas";

//Rutas de tareas
router.get(`${rutaTareas}`, ObtenerTareas);
router.get(`${rutaTareas}/:id`, ObtenerTareaPorId);
router.post(`${rutaTareas}`, CrearTarea);
router.put(`${rutaTareas}/:id`, ActualizarTarea);
router.delete(`${rutaTareas}/:id`, EliminarTarea);

module.exports = router;
