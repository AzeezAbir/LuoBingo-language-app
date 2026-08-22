/// <reference path="./global.d.ts" />

// Export shared utilities, constants, or types here
export const APP_NAME = "LuoBingo";
export const SUPPORTED_LANGUAGES = ["Luo", "English"];

// Match game exports
export * from "./types/match";
export * from "./hooks/useMatchBoard";
export { default as MatchBoard } from "./components/match/MatchBoard";
