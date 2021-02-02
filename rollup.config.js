// // import svelte from "rollup-plugin-svelte";
// // import resolve from "@rollup/plugin-node-resolve";
// // import typescript from "@rollup/plugin-typescript";
// // import commonjs from "@rollup/plugin-commonjs";

// // const pkg = require("./package.json");
// // const production = !process.env.ROLLUP_WATCH;

// // export default {
// //   input: "src/index.ts",
// //   output: [
// //     { file: pkg.module, format: "es" },
// //     { file: pkg.main, format: "umd", name: "Name" },
// //   ],
// //   external: [
// //     ...Object.keys(pkg.dependencies || {}),
// //     ...Object.keys(pkg.peerDependencies || {}),
// //   ],
// //   plugins: [
// //     svelte(),
// //     resolve({
// //       browser: true,
// //       dedupe: ["svelte"],
// //     }),
// //     commonjs(),
// //     typescript(),
// //   ],
// // };
// import svelte from "rollup-plugin-svelte";
// import commonjs from "@rollup/plugin-commonjs";
// import resolve from "@rollup/plugin-node-resolve";
// import { terser } from "rollup-plugin-terser";
// import sveltePreprocess from "svelte-preprocess";
// import typescript from "@rollup/plugin-typescript";
// import css from "rollup-plugin-css-only";
// // import dts from "rollup-plugin-dts";
// // import dts from "rollup-plugin-flat-dts";
// // import dts from "rollup-plugin-svelte-dts";
// import sourcemaps from "rollup-plugin-sourcemaps";
// import sveld from "sveld";

// const pkg = require("./package.json");
// const production = !process.env.ROLLUP_WATCH;

// function serve() {
//   let server;

//   function toExit() {
//     if (server) server.kill(0);
//   }

//   return {
//     writeBundle() {
//       if (server) return;
//       server = require("child_process").spawn(
//         "npm",
//         ["run", "start", "--", "--dev"],
//         {
//           stdio: ["ignore", "inherit", "inherit"],
//           shell: true,
//         }
//       );

//       process.on("SIGTERM", toExit);
//       process.on("exit", toExit);
//     },
//   };
// }

// export default {
//   input: "src/index.js",
//   // output: {
//   //   sourcemap: true,
//   //   format: "iife",
//   //   name: "app",
//   //   file: "public/build/bundle.js",
//   // }hhhhhhhh
//   // output: [
//   //   { file: pkg.module, format: "es" },
//   //   { file: pkg.main, format: "umd", name: "svelte-typescript-bulma" },
//   // ],
//   output: {
//     format: "es",
//     file: "dist/index.js",
//     // sourcemap: true,
//     // plugins: [dts()],
//   },
//   // external: [
//   //   ...Object.keys(pkg.dependencies || {}),
//   //   ...Object.keys(pkg.peerDependencies || {}),
//   // ],
//   plugins: [
//     svelte({
//       preprocess: sveltePreprocess({ sourceMap: true }),
//       compilerOptions: {
//         // enable run-time checks when not in production
//         dev: !production,
//       },
//     }),
//     // we'll extract any component CSS out into
//     // a separate file - better for performance
//     // css({ output: "bundle.css" }),

//     // If you have external dependencies installed from
//     // npm, you'll most likely need these plugins. In
//     // some cases you'll need additional configuration -
//     // consult the documentation for details:
//     // https://github.com/rollup/plugins/tree/master/packages/commonjs
//     resolve({
//       browser: true,
//       dedupe: ["svelte"],
//     }),
//     sveld(),
//     // commonjs(), // typescript({ //   sourceMap: true, //   inlineSources: true, // }),
//     // sourcemaps(),
//     // In dev mode, call `npm run start` once
//     // the bundle has been generated
//     !production && serve(),

//     // Watch the `public` directory and refresh the
//     // browser on changes when not in production
//     !production && livereload("public"),

//     // If we're building for production (npm run build
//     // instead of npm run dev), minify
//     production && terser(),
//   ],
//   watch: {
//     clearScreen: false,
//   },
// };

// import svelte from "rollup-plugin-svelte";
// import resolve from "@rollup/plugin-node-resolve";
// import sveld from "sveld";

// export default {
//   input: "src/index.js",
//   output: {
//     format: "es",
//     file: "lib/index.mjs",
//   },
//   plugins: [svelte(), resolve(), sveld()],
// };

import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import sveld from "sveld";
import css from "rollup-plugin-css-only";
import livereload from "rollup-plugin-livereload";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default ["es", "umd"].map((format) => {
  const UMD = format === "umd";

  return {
    input: !production ? "src/main" : "src",
    output: !production
      ? {
          sourcemap: true,
          format: "iife",
          name: "app",
          file: "public/build/bundle.js",
        }
      : {
          format,
          file: UMD ? pkg.main : pkg.module,
          name: UMD ? "svelte-typescript-bulma" : undefined,
          globals: { flatpickr: "flatpickr" },
        },
    external: Object.keys(pkg.dependencies),
    plugins: !production
      ? [
          svelte({
            compilerOptions: {
              dev: !production,
            },
          }),
          css({ output: "bundle.css" }),
          resolve({
            browser: true,
            dedupe: ["svelte"],
          }),
          commonjs(),
          !production && serve(),
          !production && livereload("public"),
          production && terser(),
        ]
      : [
          svelte({ emitCss: false }),
          resolve(),
          commonjs(),
          UMD && terser(),
          UMD &&
            sveld({
              markdown: true,
              markdownOptions: {
                onAppend: (type, document, components) => {
                  if (type === "h1")
                    document.append(
                      "quote",
                      `${components.size} components exported from ${pkg.name}@${pkg.version}.`
                    );
                },
              },
              json: true,
              jsonOptions: {
                outFile: "docs/src/COMPONENT_API.json",
              },
            }),
        ],
  };
});
