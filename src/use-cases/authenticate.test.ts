import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryProfileRepository } from "@/repositories/in-memory/in-memory-profile.repository";
import { hash } from "bcryptjs";

describe("Authenticate Use Case", () => {
	it.only("Shoud be able authenticate", async () => {
		const profileRepository = new InMemoryProfileRepository();
		const authenticateUseCase = new AuthenticateUseCase(profileRepository);
		const passwordHash = await hash("teste12345", 6);

		profileRepository.create({
			email: "test@email.com",
			passwordHash: passwordHash,
			CEP: "13990000",
			address: "Rua 2",
			phone: "19000000",
			name: "Test",
		});

		const { profile } = await authenticateUseCase.execute({
			email: "test@email.com",
			password: "teste12345",
		});

		expect(profile).toEqual(
			expect.objectContaining({
				email: "test@email.com",
				CEP: "13990000",
				address: "Rua 2",
				phone: "19000000",
				name: "Test",
			})
		);
	});
});
