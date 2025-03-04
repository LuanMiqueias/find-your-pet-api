import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetUseCaseRequest {
	petId: string;
}

interface GetPetUseCaseResponse {
	pet: Pet;
}

export class GetPetUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		petId,
	}: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
		const pet = await this.petsRepository.findById(petId);

		if (!pet) {
			throw new ResourceNotFoundError();
		}
		return { pet };
	}
}
