import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryProfileRepository } from "@/repositories/in-memory/in-memory-profile.repository";
import { hash } from "bcryptjs";
import { InvalidCreditialError } from "./errors/invalid-credentials-error";

let profileRepository: InMemoryProfileRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
	beforeEach(() => {
		profileRepository = new InMemoryProfileRepository();
		authenticateUseCase = new AuthenticateUseCase(profileRepository);
	});

	it("Shoud be able authenticate", async () => {
		profileRepository.create({
			email: "test@email.com",
			passwordHash: await hash("teste12345", 6),
			CEP: "13990000",
			address: "Rua 2",
			phone: "19000000",
			name: "Test",
		});

		const { profile } = await authenticateUseCase.execute({
			email: "test@email.com",
			password: "teste12345",
		});

		expect(profile.id).toEqual(expect.any(String));
	});

	it("Shoud not be able authenticate with wrong password", async () => {
		profileRepository.create({
			email: "test@email.com",
			passwordHash: await hash("teste12345", 6),
			CEP: "13990000",
			address: "Rua 2",
			phone: "19000000",
			name: "teste12345",
		});

		await expect(
			authenticateUseCase.execute({
				email: "test@email.com",
				password: "wrongPassword",
			})
		).rejects.toBeInstanceOf(InvalidCreditialError);
	});

	it("Shoud not be able authenticate with wrong email", async () => {
		profileRepository.create({
			email: "test@email.com",
			passwordHash: await hash("teste12345", 6),
			CEP: "13990000",
			address: "Rua 2",
			phone: "19000000",
			name: "teste12345",
		});

		await expect(
			authenticateUseCase.execute({
				email: "wrong.email@email.com",
				password: "teste12345",
			})
		).rejects.toBeInstanceOf(InvalidCreditialError);
	});
});
