import { FastifyInstance } from "fastify";

// Controllers
import { createPet } from "./create.controller";

export const petsRoutes = async (app: FastifyInstance) => {
	app.post("/pet", createPet);
};
