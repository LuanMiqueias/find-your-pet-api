import { FastifyInstance } from "fastify";
import { createProfile } from "./create.controller";

// Controllers

export const profileRoutes = async (app: FastifyInstance) => {
	app.post("/profile/register", createProfile);
};
