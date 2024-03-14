import jwt from "jsonwebtoken";
import * as userServices from "../services/userServices.js";

const authentication = async (req, res, next) => {
  const authorization = await req.headers["authorization"];

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(400).json({
      message: "Please Enter the Token",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      message: "Invalid Token",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const userData = await userServices.userFindOne({ _id: decoded._id });
    req.user = userData;
  } catch (error) {
    return res.status(400).json({ Error: error });
  }

  next();
};

export default authentication;
