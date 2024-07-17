import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";

// Controllers
import { createPet } from "./create.controller";

export const petsRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.post("/pet", createPet);
};
