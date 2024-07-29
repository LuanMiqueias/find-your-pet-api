import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPetRepository } from "../../../repositories/prisma/prisma-pets.repository";
import { GetPetUseCase } from "../../../use-cases/get-pet";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export const getPet = async (req: FastifyRequest, res: FastifyReply) => {
	const GetPetParamsSchema = z.object({
		petId: z.string(),
	});

	const repository = new PrismaPetRepository();
	const getPetUseCase = new GetPetUseCase(repository);

	const { petId } = GetPetParamsSchema.parse(req.params);

	try {
		const result = await getPetUseCase.execute({
			petId,
		});
		return res.status(200).send(result);
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return res.status(400).send({ message: err?.message });
		}
		return res.status(500).send(err);
	}
};
