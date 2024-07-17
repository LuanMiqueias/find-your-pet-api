import { FastifyReply, FastifyRequest } from "fastify";
import { SearchPetsUseCase } from "../../../use-cases/search-pets";
import { PrismaPetRepository } from "../../../repositories/prisma/prisma-pets.repository";
import { z } from "zod";
import { PetLevels, PetSize, PetType } from "@prisma/client";

export const searchPets = async (req: FastifyRequest, res: FastifyReply) => {
	const SearchPetsQuerySchema = z.object({
		size: z.nativeEnum(PetSize).optional(),
		levelOfIndependence: z.nativeEnum(PetLevels).optional(),
		powerlevel: z.nativeEnum(PetLevels).optional(),
		type: z.nativeEnum(PetType).optional(),
		cep: z.string().min(8),
		age: z.coerce.number().optional(),
		page: z.coerce.number().default(1),
		skip: z.coerce.number().default(10),
	});

	const repository = new PrismaPetRepository();
	const searchPetsUseCase = new SearchPetsUseCase(repository);

	const { size, cep, levelOfIndependence, powerlevel, age, type, page, skip } =
		SearchPetsQuerySchema.parse(req.query);

	try {
		const result = await searchPetsUseCase.execute({
			size,
			levelOfIndependence,
			powerlevel,
			age,
			type,
			cep,
			page,
			skip,
		});
		return res.status(200).send(result);
	} catch (err) {
		return res.status(500).send(err);
	}
};
