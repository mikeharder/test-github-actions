// @ts-check

const { readFile } = require("fs/promises");
const { join } = require("path");
const { env } = require("process");

/**
 * @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments
 * @param {string} folder
 * @param {string?} label
 */
module.exports = async ({ github, context, core }, folder, label) => {
  const file = join(folder, "content.txt");

  try {
    const content = await readFile(file, { encoding: "utf8" });
    console.log(`File '${file}' exists.  Content:\n${content}`);
    if (content.includes("foo")) {
      if (label) {
        console.log(`Adding label '${label}'`);
        await github.rest.issues.addLabels({
          owner: context.repo.owner,
          repo: context.repo.repo,
          issue_number: context.payload.pull_request?.number ?? -1,
          labels: [label],
        });
      }
      console.log('setOutput("FOO", true)');
      core.setOutput("FOO", true);
    } else {
      console.log('setOutput("FOO", false)');
      core.setOutput("FOO", false);
    }
  } catch (err) {
    if (err.code === "ENOENT" || err.status === "ENOENT") {
      console.log(`File '${file}' does not exist`);
    } else {
      throw err;
    }
  }
};
