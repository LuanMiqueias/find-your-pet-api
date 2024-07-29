import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { InMemoryProfileRepository } from "@/repositories/in-memory/in-memory-profile.repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";

describe("Search Pets Use Case", () => {
	it("Shoud be able list Pet", async () => {
		const profileRepository = new InMemoryProfileRepository();
		const petsRepository = new InMemoryPetRepository(profileRepository);

		const profile = await profileRepository.create({
			email: "test@email.com",
			passwordHash: await hash("teste12345", 6),
			CEP: "13990000",
			address: "Rua 2",
			phone: "19000000",
			name: "Test",
		});

		await petsRepository.create({
			name: "Pet 1",
			weight: 2,
			size: "LARGE",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam quam, volutpat interdum metus eu.",
			characteristics: ["Alegre", "Felizão"],
			powerlevel: "LOW",
			age: 2,
			type: "DOG",
			levelOfIndependence: "HIGH",
			requirementsForAdoption: ["Needs ", "e", "1"],
			profileId: profile?.id,
		});
		await petsRepository.create({
			name: "Pet 2",
			weight: 2,
			size: "LARGE",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam quam, volutpat interdum metus eu.",
			characteristics: ["Alegre", "Felizão"],
			powerlevel: "LOW",
			age: 2,
			type: "DOG",
			levelOfIndependence: "HIGH",
			requirementsForAdoption: ["Needs ", "e", "1"],
			profileId: profile?.id,
		});

		const petList = await petsRepository.searchMany({
			cep: "13990000",
			page: 1,
			skip: 0,
		});

		expect(petList).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: "Pet 1" }),
				expect.objectContaining({ name: "Pet 2" }),
			])
		);
	});
});
