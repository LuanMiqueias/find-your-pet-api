import { $Enums, Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets.repository";

interface CreatePetUseCaseRequest {
	name: string;
	weight: number;
	port: $Enums.PetPort;
	description?: string | null;
	characteristics?: string[];
}

interface CreatePetUseCaseResponse {
	pet: Pet;
}

export class CreatePetUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		name,
		port,
		weight,
		description,
		characteristics,
	}: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
		const pet = await this.petsRepository.create({
			name,
			port,
			weight,
			description,
			characteristics,
		});
		return { pet };
	}
}
