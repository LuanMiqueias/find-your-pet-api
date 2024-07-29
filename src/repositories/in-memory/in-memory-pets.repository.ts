import { prisma } from "../../lib/prisma";
import {
	Prisma,
	Pet,
	PetLevels,
	PetType,
	PetSize,
	Profile,
} from "@prisma/client";
import { PetsRepository } from "../pets.repository";
import { randomUUID } from "crypto";
import { InMemoryProfileRepository } from "./in-memory-profile.repository";

export class InMemoryPetRepository implements PetsRepository {
	//  profileId = randomUUID()
	public items: Pet[] = [];

	constructor(private profileRepository: InMemoryProfileRepository) {}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet: Pet = {
			age: data?.age,
			name: data?.name,
			weight: data?.weight,
			profileId: data?.profileId ?? null,
			characteristics: data?.characteristics as string[],
			createdAt: new Date(),
			description: data?.description ?? null,
			id: data?.id || randomUUID(),
			levelOfIndependence: data?.levelOfIndependence ?? "LOW",
			powerlevel: data?.powerlevel ?? "LOW",
			requirementsForAdoption: data?.requirementsForAdoption as string[],
			size: data?.size ?? "SMALL",
			type: data?.type ?? "DOG",
		};
		this.items.push(pet);

		return pet;
	}
	async findById(petId: string): Promise<Pet | null> {
		const pet = this.items.find((pet) => pet.id === petId) as Pet | null;

		return pet;
	}

	async searchMany(params: {
		cep: string;
		size?: PetSize;
		levelOfIndependence?: PetLevels;
		age?: number;
		powerlevel?: PetLevels;
		type?: PetType;
		page: number;
		skip: number;
	}) {
		const profileByCity = this.profileRepository.items.filter(
			(profile) => profile.CEP === params.cep
		);
		const pets = this.items
			.filter((item) =>
				profileByCity.some((profile) => profile.id === item.profileId)
			)
			.filter((item) => (params.age ? item.age === params.age : true))
			.filter((item) => (params.size ? item.size === params.size : true))
			.filter((item) =>
				params.powerlevel ? item.powerlevel === params.powerlevel : true
			)
			.filter((item) =>
				params.levelOfIndependence
					? item.levelOfIndependence === params.levelOfIndependence
					: true
			)
			.filter((item) => (params.type ? item.type === params.type : true));

		return pets;
	}
}
