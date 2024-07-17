import { Profile } from "@prisma/client";
import { ProfileRepository } from "../repositories/profile.repository";
import { compare, hash } from "bcryptjs";
import { InvalidCreditialError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	profile: Profile;
}

export class AuthenticateUseCase {
	constructor(private profileRepository: ProfileRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const profile = await this.profileRepository.findByEmail(email);

		if (!profile) {
			throw new InvalidCreditialError();
		}

		const doesPasswordMatches = await compare(password, profile?.passwordHash);

		if (!doesPasswordMatches) {
			throw new InvalidCreditialError();
		}

		return { profile };
	}
}
