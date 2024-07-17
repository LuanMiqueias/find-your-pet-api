import { Profile } from "@prisma/client";
import { ProfileRepository } from "../repositories/profile.repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user.already-exists-error";

interface CreateProfileUseCaseRequest {
	name: string;
	email: string;
	phone: string;
	CEP: string;
	address: string;
	password: string;
}

interface CreateProfileUseCaseResponse {
	profile: Profile;
}

export class CreateProfileUseCase {
	constructor(private profileRepository: ProfileRepository) {}

	async execute({
		name,
		email,
		phone,
		CEP,
		address,
		password,
	}: CreateProfileUseCaseRequest): Promise<CreateProfileUseCaseResponse> {
		const passwordHash = await hash(password, 8);

		const userWithSameEmail = await this.profileRepository.findByEmail(email);
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const profile = await this.profileRepository.create({
			name,
			email,
			phone,
			CEP,
			address,
			passwordHash,
		});
		return { profile };
	}
}
