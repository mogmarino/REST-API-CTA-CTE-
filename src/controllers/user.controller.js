import User from "../models/User";

export const createUser = (req, res) => {
  console.log("creating user");
  res.status(201).json({ message: "usuario creado correctamente" });
};
