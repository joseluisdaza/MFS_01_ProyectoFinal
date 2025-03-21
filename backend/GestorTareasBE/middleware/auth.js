const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
  } catch (error) {
    console.log(error);
    throw error;
  }

  if (!token) {
    return res
      .status(401)
      .send({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(400).send({ message: "Token no válido." });
  }
};

module.exports = auth;
