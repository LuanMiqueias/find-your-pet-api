import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
	create(data: Prisma.PetCreateInput): Promise<Pet>;
	findById(petId: string): Promise<Pet | null>;
}
