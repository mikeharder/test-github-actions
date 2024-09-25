// @ts-check

const { readFile } = require("fs/promises");
const { join } = require("path");

/**
 * @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments
 * @param {string} folder
 */
module.exports = async ({ github, context, core }, folder) => {
  const file = join(folder, "content.txt");

  try {
    const content = await readFile(file, { encoding: "utf8" });
    console.log(`File '${file}' exists.  Content:\n${content}`);
    if (content.includes("label1")) {
      // TODO: Add label
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`File '${file}' does not exist`);
    } else {
      throw err;
    }
  }
};
