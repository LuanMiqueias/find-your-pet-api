import { prisma } from "../../lib/prisma";
import { Prisma, Pet, PetLevels, PetType, PetSize } from "@prisma/client";
import { PetsRepository } from "../pets.repository";

export class PrismaPetRepository implements PetsRepository {
	async create(data: Prisma.PetCreateInput) {
		const pet = await prisma.pet.create({
			data,
		});

		return pet;
	}
	async findById(petId: string): Promise<Pet | null> {
		const pet = await prisma.pet.findUnique({
			where: {
				id: petId,
			},
		});

		return pet;
	}

	async searchMany(input: {
		cep: string;
		size?: PetSize;
		levelOfIndependence?: PetLevels;
		age?: number;
		powerlevel?: PetLevels;
		type?: PetType;
		page: number;
		skip: number;
	}) {
		const pets = await prisma.pet.findMany({
			// skip: (input.page - 1) * input.skip,
			where: {
				Profile: {
					CEP: input.cep,
				},
				AND: [
					{
						size: input.size,
					},
					{
						levelOfIndependence: input.levelOfIndependence,
					},
					{
						type: input.type,
					},
					{
						powerlevel: input.powerlevel,
					},
					{
						age: input.age,
					},
				],
			},
		});

		return pets;
	}
}
