import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePetUseCase } from "../../../use-cases/create-pet";
import { PrismaPetRepository } from "../../../repositories/prisma/prisma-pets.repository";
import { z } from "zod";
import { PetLevels, PetPort, PetType } from "@prisma/client";

export const createPet = async (req: FastifyRequest, res: FastifyReply) => {
	const createPetBodySchema = z.object({
		name: z.string(),
		weight: z.number(),
		size: z.nativeEnum(PetPort),
		description: z.string().max(300).nullable(),
		characteristics: z.string().array(),
		levelOfIndependence: z.nativeEnum(PetLevels),
		powerlevel: z.nativeEnum(PetLevels),
		age: z.number(),
		requirementsForAdoption: z.string().max(40).array(),
		type: z.nativeEnum(PetType),
	});

	const repository = new PrismaPetRepository();
	const createPetUseCase = new CreatePetUseCase(repository);

	const {
		name,
		weight,
		size,
		description,
		characteristics,
		levelOfIndependence,
		powerlevel,
		age,
		requirementsForAdoption,
		type,
	} = createPetBodySchema.parse(req.body);

	try {
		const result = await createPetUseCase.execute({
			name,
			weight,
			size,
			description,
			characteristics,
			levelOfIndependence,
			powerlevel,
			age,
			requirementsForAdoption,
			type,
			profileId: req.user.sub,
		});
		return res.status(201).send(result);
	} catch (err) {
		return res.status(500).send(err);
	}
};
