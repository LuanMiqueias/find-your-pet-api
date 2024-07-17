import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { ProfileRepository } from "../profile.repository";

export class PrismaProfileRepository implements ProfileRepository {
	async create(data: Prisma.ProfileCreateInput) {
		const profile = await prisma.profile.create({
			data,
		});

		return profile;
	}
	async findByEmail(email: string) {
		const profile = await prisma.profile.findUnique({
			where: {
				email,
			},
		});

		return profile;
	}
	async findById(id: string) {
		const profile = await prisma.profile.findUnique({
			where: {
				id,
			},
		});

		return profile;
	}
}
