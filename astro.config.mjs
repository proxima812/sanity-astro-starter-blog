// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET
} = loadEnv(import.meta.env.MODE, process.cwd(), "");

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;
import react from "@astrojs/react";
import sanity from "@sanity/astro";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  // Hybrid+adapter is required to support embedded Sanity Studio
  output: "hybrid",
  integrations: [sanity({
    projectId,
    dataset,
    studioBasePath: "/admin",
    useCdn: false,
    // `false` if you want to ensure fresh data
    apiVersion: "2023-03-20" // Set to date of setup to use the latest API version
  }), react() // Required for Sanity Studio
  ],
  adapter: netlify()
});