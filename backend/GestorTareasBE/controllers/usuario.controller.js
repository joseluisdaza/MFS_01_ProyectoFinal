const { token } = require("morgan");
const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
const excludedFields = ["Password", "createdAt", "updatedAt"];

exports.CrearUsuario = async (req, res) => {
  try {
    const { Nombre, Correo, Password } = req.body;

    //Encryptar la contraseña
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(Password, salt);

    //TODO: Agregar validaciones para que no hayan dos cuentas con el mismo correo.

    const usuario = await Usuario.create({
      Nombre: Nombre,
      Correo: Correo,
      Password: hashedPassword,
    });
    res.status(201).send({
      name: usuario.Nombre,
      email: usuario.Correo,
      password: Password,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema creando el usuario. ${error}` });
  }
};

exports.ObtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: excludedFields },
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
      attributes: { exclude: excludedFields },
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
    const { Correo, Password } = req.body;
    console.log(req.body);
    console.log(Correo);
    console.log(Password);

    const usuario = await Usuario.findOne({
      where: { Correo: Correo },
    });

    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    console.log("Password de la DB");
    console.log(usuario.Password);
    // const contrasenaValida = bcrypt.compareSync(Password, usuario.Password);
    const contrasenaValida = Password === usuario.Password;
    console.log("Contraseña valida");
    console.log(contrasenaValida);

    if (!contrasenaValida) {
      return res.status(401).send({ message: "Credenciales inválidas." });
    }

    //Generar token JWT
    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
      expiresIn: 3600, // 24 horas
    });

    res.status(200).send({
      message: "Login exitoso",
      token: token,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: `Hubo un problema iniciando sesión. ${error}` });
  }
};

exports.Me = async (req, res) => {
  //TODO: Obtener el usuario a partir del token JWT.
  res.status(200).send(req.usuario);
};
