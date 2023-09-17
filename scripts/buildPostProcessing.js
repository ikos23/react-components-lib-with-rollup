// this script runs on "dist" folder produced by "npm run build"
// we want to add package.json (and README.md, basically anything you might need) to "dist"
// and we are agoing to publish it

// the reason for this is that after we publish we'dlike to get this structure:
// the-lib-root
//   | Component1
//   | Component2
//   | ...
//   | index.js
//   | package.json

// that will allow us to do stuff like "import { Component1 } from 'the-lib-root/Component1'"
const { resolve, join, basename } = require("path");
const { readFile, writeFile, copy } = require("fs-extra");
const packagePath = process.cwd();
const distPath = join(packagePath, "./dist");

async function createNewPackageJson() {
  const packageJsonData = await readFile(resolve(packagePath, "./package.json"), "utf8");
  const { scripts, devDependencies, ...others } = JSON.parse(packageJsonData);

  const newPackageJson = {
    ...others,
    private: false,
    types: "./index.d.ts",
    main: "./cjs/index.js",
    module: "./index.js",
  };

  return newPackageJson;
}

async function addNewPackageJsonToDist() {
  const targetPath = resolve(distPath, "./package.json");
  const newPackageJson = await createNewPackageJson();
  await writeFile(targetPath, JSON.stringify(newPackageJson, null, 2), "utf8");
}

async function addFileToDist(file) {
  const sourcePath = resolve(packagePath, file);
  const targetPath = resolve(distPath, basename(file));
  await copy(sourcePath, targetPath);
}

async function run() {
  try {
    await addNewPackageJsonToDist();
    await addFileToDist("./README.md");
    await addFileToDist("./.npmrc"); // in this case is needed to be able to publish
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
