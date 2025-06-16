import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      react: pluginReact,
    },
    languageOptions: { globals: globals.browser },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
    },
  },
  tseslint.configs.recommended,
  { ignores: ["dist/**", "coverage/**", "node_modules/**"] },
  prettier,
]);
