const express = require("express");
const router = express.Router();
const {
  CrearUsuario,
  ObtenerUsuarios,
  ObtenerUsuarioPorId,
  ActualizarUsuario,
  EliminarUsuario,
  Login,
  Me,
} = require("../controllers/usuario.controller");
const rutaUsuario = "/auth";

//Rutas de usuarios
router.post(`${rutaUsuario}/register`, CrearUsuario);
router.post(`${rutaUsuario}/login`, Login);
router.post(`${rutaUsuario}/me`, Me);

router.get(`${rutaUsuario}`, ObtenerUsuarios);
router.get(`${rutaUsuario}/:id`, ObtenerUsuarioPorId);
router.put(`${rutaUsuario}/:id`, ActualizarUsuario);
router.delete(`${rutaUsuario}/:id`, EliminarUsuario);

module.exports = router;
