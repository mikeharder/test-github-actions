// @ts-check

const { existsSync } = require("fs");

/**
 * @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments
 */
module.exports = async ({ github, context, core }) => {
  console.log(JSON.stringify(context, null, 2));

  const fooExists = existsSync("foo");
  console.log(`fooExists: ${fooExists}`);
  if (fooExists) {
    console.log("Adding label 'pull-request-completed'");

    const payload = /** @type {import("@octokit/webhooks-types").WorkflowRunCompletedEvent} */ (context.payload);

    const pullRequests = payload.workflow_run.pull_requests;
    if (pullRequests.length === 0) {
      console.log("No pull request associated with this commit.");
    } else if (pullRequests.length === 1) {
      const prNumber = pullRequests[0].number;
      await github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: prNumber,
        labels: ["pull-request-completed"],
      });
    } else {
      console.log("Too many pull requests associated with this commit.");
    }
  } else {
    console.log("Not adding label 'pull-request-completed'");
  }
};
