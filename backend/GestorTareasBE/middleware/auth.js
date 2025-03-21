const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id, {
      attributes: { exclude: ["Password", "createdAt", "updatedAt"] },
    });

    if (!usuario) {
      res.status(404).send({ message: "Usuario no encontrado." });
    }

    //Add the user information as part of the request.
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Autenticación fallida." });
  }
};

module.exports = auth;
