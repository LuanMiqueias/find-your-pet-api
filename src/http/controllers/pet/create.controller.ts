import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePetUseCase } from "../../../use-cases/create-pet";
import { PrismaPetRepository } from "../../../repositories/prisma/prisma-pets.repository";
import { z } from "zod";
import { PetPort } from "@prisma/client";

export const createPet = async (req: FastifyRequest, res: FastifyReply) => {
	const createPetBodySchema = z.object({
		name: z.string(),
		weight: z.number(),
		port: z.enum([PetPort.LARGE, PetPort.MEDIUM, PetPort.SMALL]),
		description: z.string().nullable(),
		characteristics: z.string().array(),
	});

	const repository = new PrismaPetRepository();
	const createPetUseCase = new CreatePetUseCase(repository);

	const data = createPetBodySchema.parse(req.body);

	try {
		const result = await createPetUseCase.execute({
			...data,
		});
		return res.status(201).send(result);
	} catch (err) {
		return res.status(500).send(err);
	}
};
