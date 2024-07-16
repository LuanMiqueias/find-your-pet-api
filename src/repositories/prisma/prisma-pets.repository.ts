import { prisma } from "../../lib/prisma";
import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets.repository";

export class PrismaPetRepository implements PetsRepository {
	async create(data: Prisma.PetCreateInput) {
		const pet = await prisma.pet.create({
			data,
		});

		return pet;
	}
	async findById(petId: string): Promise<Pet | null> {
		throw new Error("Method not implemented.");
	}
}
