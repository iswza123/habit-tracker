import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you deploy to GitHub Pages at https://<user>.github.io/<repo>/,
// uncomment the base line and set it to "/<repo>/".
export default defineConfig({
  plugins: [react()],
  // base: "/habit-tracker/",
});
