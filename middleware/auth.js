import * as  userServices from "../services/userServices.js";
import { BadRequestError } from "../error/error.js";
import { sendToken }from "../utils/services.js";

const authentication = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new BadRequestError("Please Enter the Token");
      }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new BadRequestError("Invalid Token");
    }

    const decoded = sendToken(token, process.env.SECRET);
    const userData = await userServices.userFindOne({ _id: decoded._id });

    if (!userData) {
      throw new BadRequestError("User Not Found");
    }

    req.user = userData; 
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
