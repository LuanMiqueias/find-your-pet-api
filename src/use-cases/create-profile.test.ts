import { InMemoryProfileRepository } from "@/repositories/in-memory/in-memory-profile.repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";

describe("Create Profile Use Case", () => {
	it("Shoud be able create profile", async () => {
		const profileRepository = new InMemoryProfileRepository();
		const passwordHash = await hash("teste12345", 6);

		const profile = await profileRepository.create({
			email: "test@email.com",
			passwordHash: passwordHash,
			CEP: "13990000",
			address: "Rua 2",
			phone: "19000000",
			name: "Test",
		});

		expect(profile.id).toEqual(expect.any(String));
	});
});
