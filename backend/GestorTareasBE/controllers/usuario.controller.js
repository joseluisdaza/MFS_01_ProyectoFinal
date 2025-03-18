const { token } = require("morgan");
const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");

exports.CrearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).send(usuario);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema creando el usuario. ${error}` });
  }
};

exports.ObtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["Password"] },
    });
    res.status(200).send(usuarios);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo los usuarios. ${error}` });
  }
};

exports.ObtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ["Password"] },
    });
    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    } else {
      return res.status(200).send(usuario);
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema obteniendo el usuario. ${error}` });
  }
};

exports.ActualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    } else {
      await usuario.update(req.body);
      return res.status(200).send({
        id: user.id,
        Nombre: user.Nombre,
        Correo: user.Correo,
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema actualizando el usuario. ${error}` });
  }
};

exports.EliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    } else {
      await usuario.destroy();
      return res.status(204).send();
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema eliminando el usuario. ${error}` });
  }
};

exports.Login = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: { Correo: req.body.Correo },
    });
    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    } else {
      const contrasenaValida = bcrypt.compareSync(
        req.body.Password,
        usuario.Password
      );
      if (contrasenaValida) {
        //TODO: Generar un JWT y devolverlo en la respuesta.
        var token = jwt.sign;
        return res.status(200).send({
          message: "Login exitoso",
          token: token,
        });
      } else {
        return res.status(401).send({ message: "Credenciales inválidas." });
      }
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema logeando al usuario. ${error}` });
  }
};

exports.Me = async (req, res) => {
  //TODO: Obtener el usuario a partir del token JWT.
  res.status(500).send({ message: "No implementado." });
};
