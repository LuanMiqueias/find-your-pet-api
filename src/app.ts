import fastify from "fastify";
import { ZodError } from "zod";

// Env
import { env } from "./env";

// Routes
import { petsRoutes } from "./http/controllers/pet/routes";
import { profileRoutes } from "./http/controllers/profile/routes";

export const app = fastify();

app.register(profileRoutes);
app.register(petsRoutes);

app.setErrorHandler((error, req, res) => {
	if (error instanceof ZodError) {
		return res.status(400).send({
			message: "Validation Error",
			issues: error.format(),
		});
	}

	if (env.NODE_ENV === "dev") {
		console.log(error);
	}

	return res.status(500).send({ message: "Internal Server Error" });
});
