import { Pet, PetLevels, PetSize, PetType } from "@prisma/client";
import { PetsRepository } from "../repositories/pets.repository";

interface GetPetsUseCaseRequest {
	size?: PetSize | null;
	levelOfIndependence?: PetLevels | null;
	powerlevel?: PetLevels | null;
	age?: number | null;
	type?: PetType | null;
	page: number;
	skip: number;
	cep: string;
}

interface GetPetsUseCaseResponse {
	pets: Pet[];
}

export class GetPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute(data: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
		const pets = await this.petsRepository.searchMany(data);
		return { pets };
	}
}
