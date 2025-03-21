const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

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
router.post(`${rutaTareas}`, auth, CrearTarea);
router.get(`${rutaTareas}`, auth, ObtenerTareas);
router.get(`${rutaTareas}/:id`, auth, ObtenerTareaPorId);
// router.get(`${rutaTareas}/:id`, auth, ObtenerTareasPorUsuario);
router.put(`${rutaTareas}/:id`, auth, ActualizarTarea);
router.delete(`${rutaTareas}/:id`, auth, EliminarTarea);

module.exports = router;
