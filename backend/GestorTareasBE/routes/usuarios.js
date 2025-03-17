const express = require("express");
const router = express.Router();
const {
  CrearUsuario,
  ObtenerUsuarios,
  ObtenerUsuarioPorId,
  ActualizarUsuario,
  EliminarUsuario,
} = require("../controllers/usuario.controller");
const rutaUsuario = "/usuarios";

//Rutas de usuarios
router.get(`${rutaUsuario}`, ObtenerUsuarios);
router.get(`${rutaUsuario}/:id`, ObtenerUsuarioPorId);
router.post(`${rutaUsuario}`, CrearUsuario);
router.put(`${rutaUsuario}/:id`, ActualizarUsuario);
router.delete(`${rutaUsuario}/:id`, EliminarUsuario);

module.exports = router;
