/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        serverActions: {
            allowedOrigins: ["effective-space-winner-q5q494wxvxjcp6w-3000.app.github.dev", "localhost:3000"]
        }
    }
};

export default config;
