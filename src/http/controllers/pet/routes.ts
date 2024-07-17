import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";

// Controllers
import { createPet } from "./create.controller";
import { searchPets } from "./search.controller";
import { getPet } from "./get-pet.controller";

export const petsRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.post("/pet", createPet);
	app.get("/pet", searchPets);
	app.get("/pet/:petId", getPet);
};
