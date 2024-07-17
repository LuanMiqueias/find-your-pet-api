import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaProfileRepository } from "../../../repositories/prisma/prisma-profile.repository";
import { AuthenticateUseCase } from "../../../use-cases/authenticate";
import { InvalidCreditialError } from "../../../use-cases/errors/invalid-credentials-error";
import { userInfo } from "os";

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
	const AuthenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const repository = new PrismaProfileRepository();
	const authenticateUseCase = new AuthenticateUseCase(repository);

	const { email, password } = AuthenticateBodySchema.parse(req.body);

	try {
		const { profile } = await authenticateUseCase.execute({
			email,
			password,
		});

		const token = await res.jwtSign(
			{},
			{
				sign: {
					sub: profile?.id,
				},
			}
		);
		return res.status(200).send({
			token,
		});
	} catch (err) {
		if (err instanceof InvalidCreditialError) {
			return res.status(404).send({ message: err.message });
		} else {
			return res.status(500).send(); //TODO: fix later
		}
	}
};
