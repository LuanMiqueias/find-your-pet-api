import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePetUseCase } from "../../../use-cases/create-pet";
import { PrismaPetRepository } from "../../../repositories/prisma/prisma-pets.repository";
import { z } from "zod";
import { PetLevels, PetType } from "@prisma/client";
import { PrismaProfileRepository } from "../../../repositories/prisma/prisma-profile.repository";
import { CreateProfileUseCase } from "../../../use-cases/create-profile";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user.already-exists-error";

export const createProfile = async (req: FastifyRequest, res: FastifyReply) => {
	const createProfileBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		phone: z.string().min(7),
		CEP: z.string().min(8),
		address: z.string(),
		password: z.string().min(6),
	});

	const repository = new PrismaProfileRepository();
	const createProfileUseCase = new CreateProfileUseCase(repository);

	const { name, email, phone, CEP, address, password } =
		createProfileBodySchema.parse(req.body);

	try {
		await createProfileUseCase.execute({
			name,
			email,
			phone,
			CEP,
			address,
			password,
		});
		return res.status(201).send();
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return res.status(409).send({ message: err.message });
		} else {
			return res.status(500).send(); //TODO: fix later
		}
	}
};
