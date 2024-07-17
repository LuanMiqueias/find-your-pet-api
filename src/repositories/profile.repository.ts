import { Prisma, Profile } from "@prisma/client";

export interface ProfileRepository {
	create(data: Prisma.ProfileCreateInput): Promise<Profile>;
	findByEmail(email: string): Promise<Profile | null>;
}
