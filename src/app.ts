import fastify from "fastify";

export const app = fastify();

app.register(async (fastify, options) => {
	fastify.get("/", async (req, res) => {
		return res.status(200).send("Hello!");
	});
});
