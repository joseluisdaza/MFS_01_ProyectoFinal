const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

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
router.get(`${rutaUsuario}/me`, auth, Me);

router.get(`${rutaUsuario}`, ObtenerUsuarios);
router.get(`${rutaUsuario}/:id`, ObtenerUsuarioPorId);
router.put(`${rutaUsuario}/:id`, auth, ActualizarUsuario);
router.delete(`${rutaUsuario}/:id`, auth, EliminarUsuario);

module.exports = router;
