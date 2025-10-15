import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import fs from "fs-extra";
import { join } from "path";

async function generateManifest() {
  const outputDir = join(__dirname, "dist/assets");
  const distDir = join(__dirname, "dist");
  const bundles = {};

  await fs.ensureDir(distDir);

  if (!(await fs.exists(outputDir))) {
    console.log(
      "[MANIFEST_SKIP] Assets directory not found, creating empty manifest."
    );
    await fs.writeJson(join(distDir, "section-bundles.json"), bundles);
    return;
  }

  const files = await fs.readdir(outputDir);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    if (file.startsWith("section-auth")) bundles["auth"] = `/assets/${file}`;
    if (file.startsWith("section-dashboard"))
      bundles["dashboard"] = `/assets/${file}`;
    if (file.startsWith("section-profile"))
      bundles["profile"] = `/assets/${file}`;
    if (file.startsWith("section-discover"))
      bundles["discover"] = `/assets/${file}`;
    if (file.startsWith("section-shop")) bundles["shop"] = `/assets/${file}`;
    if (file.startsWith("section-misc")) bundles["misc"] = `/assets/${file}`;
  });

  await fs.writeJson(join(distDir, "section-bundles.json"), bundles);
  console.log(
    "[MANIFEST_GENERATED] section-bundles.json created successfully."
  );
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), vueDevTools()],
    define: {
      global: "globalThis",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        buffer: "buffer",
      },
    },
    publicDir: "public",
    test: {
      environment: "jsdom",
      globals: true,
    },
    build: {
      sourcemap: true,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Bundle components by section
            if (
              id.includes("/components/auth/") ||
              id.includes("/components/layout/auth/") ||
              id.includes("/templates/auth/") 
            ) {
              return "section-auth";
            }
            if (
              id.includes("/components/about/") ||
              id.includes("/components/layout/about/") ||
              id.includes("/templates/about/") 
            ) {
              return "section-about";
            }
            if (
              id.includes("/components/contact/") ||
              id.includes("/components/layout/contact/") ||
              id.includes("/templates/contact/") 
            ) {
              return "section-contact";
            }
            if (
              id.includes("/components/dashboard/") ||
              id.includes("/components/layout/dashboard/") ||
              id.includes("/templates/dashboard/") 
            ) {
              return "section-dashboard";
            }
            if (
              id.includes("/components/profile/") ||
              id.includes("/components/layout/profile/") ||
              id.includes("/templates/profile/")
            ) {
                
              return "section-profile";
            }
            if (
              id.includes("/components/discover/") ||
              id.includes("/components/layout/discover/") ||
              id.includes("/templates/discover/")
            ) {
              return "section-discover";
            }
            if (
              id.includes("/components/shop/") ||            // legacy / flat shop comps
              id.includes("/components/layout/shop/") ||     // your current layout path
              id.includes("/templates/shop/")                // your ShopWrapper.vue, etc.
            ) {
              return "section-shop";
            }
            if (id.includes("/components/NotFound.vue") || id.includes("/templates/misc/")) return "section-misc";

            // Bundle i18n core (without locales) - much smaller now
            if (
              id.includes("/i18n/index.js") ||
              id.includes("/i18n/lazyLoader.js")
            ) {
              return "i18n-core";
            }

            // Force separate bundles for locale modules
            if (id.includes("/i18n/locales/en.js")) {
              return "locale-en";
            }
            if (id.includes("/i18n/locales/vi.js")) {
              return "locale-vi";
            }

            // Force separate bundles for locale JSON data
            if (id.includes("/i18n/locales/en.json")) {
              return "locale-en-data";
            }
            if (id.includes("/i18n/locales/vi.json")) {
              return "locale-vi-data";
            }

            // Bundle translation utils
            if (id.includes("/utils/translationUtils.js"))
              return "translation-utils";
          },
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
        plugins: [
          {
            name: "generate-manifest",
            async closeBundle() {
              await generateManifest();
            },
          },
        ],
      },
    },
  };
});
