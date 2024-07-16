import fastify from "fastify";
import { petsRoutes } from "./http/controllers/pet/routes";
export const app = fastify();

app.register(petsRoutes);
