import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
	},
	base: "/",
	server: {
		host: "0.0.0.0",
		watch: {
			usePolling: true,
		},
		hmr: { host: "0.0.0.0" },
	},
});
