import { $Enums, Pet, PetLevels, PetSize, PetType } from "@prisma/client";
import { PetsRepository } from "../repositories/pets.repository";

interface CreatePetUseCaseRequest {
	name: string;
	weight: number;
	description?: string | null;
	characteristics?: string[];
	size?: PetSize;
	levelOfIndependence?: PetLevels;
	powerlevel?: PetLevels;
	age: number;
	requirementsForAdoption?: string[];
	type?: PetType;
	profileId: string;
}

interface CreatePetUseCaseResponse {
	pet: Pet;
}

export class CreatePetUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute(
		data: CreatePetUseCaseRequest
	): Promise<CreatePetUseCaseResponse> {
		const pet = await this.petsRepository.create(data);
		return { pet };
	}
}
