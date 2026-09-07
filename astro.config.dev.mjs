import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export default defineConfig({
  integrations: [
    icon({
      include: {
        "simple-icons": ["zalo"],
      },
    }),
  ],

  output: "static",

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});