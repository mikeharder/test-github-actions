// @ts-check

const { readFile } = require("fs/promises");
const { join } = require("path");

/**
 * @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments
 * @param {string} folder
 * @param {string} label
 */
module.exports = async ({ github, context, core }, folder, label) => {
  const file = join(folder, "content.txt");

  try {
    const content = await readFile(file, { encoding: "utf8" });
    console.log(`File '${file}' exists.  Content:\n${content}`);
    if (content.includes("foo")) {
      await github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.payload.pull_request?.number ?? -1,
        labels: [label],
      });
    }
  } catch (err) {
    if (err.code === "ENOENT" || err.status === "ENOENT") {
      console.log(`File '${file}' does not exist`);
    } else {
      throw err;
    }
  }
};
