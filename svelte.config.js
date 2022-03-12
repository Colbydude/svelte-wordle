import adapter from "@sveltejs/adapter-static";
import * as path from "path";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        defaults: {
            style: "postcss",
        },
        postcss: true,
    }),

    kit: {
        adapter: adapter({
            fallback: "index.html",
        }),

        // Override http methods in the Todo forms
        methodOverride: {
            allowed: ["PATCH", "DELETE"],
        },

        vite: {
            resolve: {
                alias: {
                    $components: path.resolve("src/components/"),
                    $lib: path.resolve("src/lib/"),
                    $store: path.resolve("src/store/"),
                },
            },
        },
    },
};

export default config;
