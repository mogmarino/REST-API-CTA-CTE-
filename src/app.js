// aqui se configura la aplicacion
import express from "express";
import morgan from "morgan";
import * as pkg from "../package.json";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { createRoles } from "./libs/initialSetup";

const app = express();
createRoles();

app.set("pkg", pkg);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    author: app.get("pkg").author,
    name: app.get("pkg").name,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});
// rutas de la aplicacion
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
