import fs from "fs";

import packageJson from "./package.json" assert { type: "json" };

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import image from "@rollup/plugin-image";

import peerDepsExternal from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";

// plugins used for the whole lib
const getPlugins = (opts = {}) => {
  return [
    peerDepsExternal(),
    resolve(),
    replace({
      __IS_DEV__: process.env.NODE_ENV === "development",
    }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", ...opts.ts }),
    image(),
    terser(),
  ];
};

// we need to generate package.json for every component
const getComponentPlugins = (dir) => [
  ...getPlugins({ ts: { declaration: false } }), // declaration: false is important here, otherwise we get bad output structure
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${dir}`,
      private: true,
      main: "../cjs/index.js",
      module: "./index.js",
      types: "./index.d.ts",
    },
  }),
];

const components = fs
  .readdirSync("./src")
  .filter((name) => name !== "index.ts")
  .map((dir) => {
    return {
      input: `src/${dir}/index.ts`,
      output: {
        file: `dist/${dir}/index.js`,
        sourcemap: true,
        exports: "named",
      },
      plugins: getComponentPlugins(dir),
      external: ["react", "react-dom"],
    };
  });

// the order here matters, because we write declarations to dist folder - on the main run
// Rollup will create all the folders for every component and put declarations there
// so when we build specific components we don't need to do that again (it will be there)
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: getPlugins(),
    external: ["react", "react-dom"],
  },
  ...components, // must go last
];
