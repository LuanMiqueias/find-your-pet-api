import { FastifyInstance } from "fastify";
import { createProfile } from "./create.controller";
import { authenticate } from "./authenticate.controller";

// Controllers

export const profileRoutes = async (app: FastifyInstance) => {
	app.post("/profile/register", createProfile);
	app.post("/profile/login", authenticate);
};
