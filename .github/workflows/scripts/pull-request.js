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
  console.log(JSON.stringify(context, null, 2));

  const file = join(folder, "content.txt");

  const payload = /** @type {import("@octokit/webhooks-types").PullRequestEvent} */ (context.payload);

  const permissionLevel = await github.rest.repos.getCollaboratorPermissionLevel({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    username: payload.pull_request.user.login,
  });

  console.log(JSON.stringify(permissionLevel, null, 2));

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
