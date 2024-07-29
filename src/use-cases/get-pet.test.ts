import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { InMemoryProfileRepository } from "@/repositories/in-memory/in-memory-profile.repository";
import { describe, expect, it } from "vitest";

describe("Get Pet Use Case", () => {
	it("Shoud be able get pet", async () => {
		const profileRepository = new InMemoryProfileRepository();
		const petsRepository = new InMemoryPetRepository(profileRepository);

		const { id: petId } = await petsRepository.create({
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
		});

		const pet = await petsRepository.findById(petId);

		expect(pet).toEqual(
			expect.objectContaining({
				id: petId,
				name: "Pet 1",
			})
		);
	});
});
