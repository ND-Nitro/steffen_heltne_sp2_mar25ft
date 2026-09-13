import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/steffen_heltne_sp2_mar25ft/",

  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        listing: resolve(rootDir, "listing.html"),
        login: resolve(rootDir, "login.html"),
        register: resolve(rootDir, "register.html"),
        profile: resolve(rootDir, "profile.html"),
        create: resolve(rootDir, "create.html"),
        edit: resolve(rootDir, "edit.html"),
      },
    },
  },
});
