import { Pet, PetLevels, PetSize, PetType } from "@prisma/client";
import { PetsRepository } from "../repositories/pets.repository";

interface SearchPetsUseCaseRequest {
	size?: PetSize | null;
	levelOfIndependence?: PetLevels | null;
	powerlevel?: PetLevels | null;
	age?: number | null;
	type?: PetType | null;
	page: number;
	skip: number;
	cep: string;
}

interface SearchPetsUseCaseResponse {
	pets: Pet[];
}

export class SearchPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute(
		data: SearchPetsUseCaseRequest
	): Promise<SearchPetsUseCaseResponse> {
		const pets = await this.petsRepository.searchMany(data);
		return { pets };
	}
}
