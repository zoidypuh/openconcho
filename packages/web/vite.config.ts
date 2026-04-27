import { readFileSync } from "node:fs";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const host = process.env.TAURI_DEV_HOST;
const { version } = JSON.parse(
	readFileSync(path.resolve(__dirname, "../../package.json"), "utf-8"),
) as { version: string };

export default defineConfig({
	clearScreen: false,
	plugins: [tanstackRouter({ autoCodeSplitting: true }), react(), tailwindcss()],
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 5173,
		strictPort: true,
		host: host || false,
		hmr: host ? { protocol: "ws", host, port: 1421 } : undefined,
		watch: { ignored: ["**/src-tauri/**"] },
	},
	envPrefix: ["VITE_", "TAURI_ENV_*"],
	build: {
		target: process.env.TAURI_ENV_PLATFORM === "windows" ? "chrome120" : "esnext",
		minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
		sourcemap: !!process.env.TAURI_ENV_DEBUG,
	},
});
