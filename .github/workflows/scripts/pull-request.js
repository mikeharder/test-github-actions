// @ts-check

const { readFile } = require("fs/promises");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const file = "content.txt";

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
