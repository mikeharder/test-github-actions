// @ts-check

const { existsSync } = require("fs");

/**
 * @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments
 */
module.exports = async ({ github, context, core }) => {
  if (existsSync("foo")) {
    console.log("Adding label 'pull-request-completed'");
    console.log(JSON.stringify(context));
    // await github.rest.issues.addLabels({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   issue_number: context.payload.
    //   labels: [label],
    // });
  }
  else {
    console.log("Not adding label 'pull-request-completed'");
  }
};
