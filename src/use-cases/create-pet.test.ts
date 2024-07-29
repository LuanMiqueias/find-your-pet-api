import { InMemoryProfileRepository } from "@/repositories/in-memory/in-memory-profile.repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { hash } from "bcryptjs";

describe("Create Pet Use Case", () => {
	it("Shoud be able create pet", async () => {
		const profileRepository = new InMemoryProfileRepository();
		const petsRepository = new InMemoryPetRepository(profileRepository);

		const pet = await petsRepository.create({
			name: "test 3",
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

		expect(pet).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: "test 3",
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
			})
		);
	});
});
