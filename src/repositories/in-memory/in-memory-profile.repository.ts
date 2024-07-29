import { prisma } from "../../lib/prisma";
import { Prisma, Profile } from "@prisma/client";
import { ProfileRepository } from "../profile.repository";
import { randomUUID } from "crypto";

export class InMemoryProfileRepository implements ProfileRepository {
	public items: Profile[] = [];

	async create(data: Prisma.ProfileCreateInput) {
		const profile: Profile = {
			CEP: data?.CEP,
			id: data?.id || randomUUID(),
			email: data?.email,
			address: data?.address,
			createdAt: new Date(),
			name: data?.name,
			passwordHash: data?.passwordHash,
			phone: data?.phone,
		};

		this.items.push(profile);

		return profile;
	}
	async findByEmail(email: string) {
		const profile = this.items.find((item) => item.email === email) || null;

		return profile;
	}
	async findById(id: string) {
		const profile = this.items.find((item) => item.id === id) || null;

		return profile;
	}
}
