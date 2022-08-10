import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  //obtener los roles que estan incluidos en el usuario obtenido anteriormente ({ $in: user.roles } )
  const roles = await Role.find({ _id: { $in: user.roles } });

  console.log(roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require moderator role" });
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  //obtener los roles que estan incluidos en el usuario obtenido anteriormente ({ $in: user.roles } )
  const roles = await Role.find({ _id: { $in: user.roles } });

  console.log(roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require admin role" });
};
