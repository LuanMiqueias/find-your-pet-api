import { Pet, PetLevels, PetSize, PetType, Prisma } from "@prisma/client";

export interface PetsRepository {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
	findById(petId: string): Promise<Pet | null>;
	searchMany(input: {
		cep: string;
		size?: PetSize | null;
		levelOfIndependence?: PetLevels | null;
		age?: number | null;
		powerlevel?: PetLevels | null;
		type?: PetType | null;
		page: number;
		skip: number;
	}): Promise<Pet[]>;
}
