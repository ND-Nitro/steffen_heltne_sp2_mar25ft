import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        fetch: "readonly",
        URLSearchParams: "readonly",
      },
    },
  },
];
