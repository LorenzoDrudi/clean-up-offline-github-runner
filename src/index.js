const core = require('@actions/core');
const { App } = require("@octokit/app");

async function run() {

    try {

        const repoOwner = core.getInput('repo-owner');
        const repoName = core.getInput('repo-name');

        // Log in
        const app = new App({
            appId: process.env.APP_ID,
            privateKey: process.env.APP_PRIVATE_KEY,
        });

        const { data } = await app.octokit.request("/app");

        // List all the repository where the App is installed
        for await (const { octokit, repository } of app.eachRepository.iterator()) {
            console.log(repository.owner.login);
            console.log(repository.name);
            if (repository.owner.login === repoOwner && repository.name === repoName) {
                console.log(repository)
                console.log(octokit)
                const runners = await octokit.rest.actions.listSelfHostedRunnersForRepo({
                    owner: repoOwner,
                    repo: repoName,
                });
                console.log(runners)
                // Delete all the offline self-hosted runners from the repository
                for (const runner of runners) {
                    if (runner.status === "offline" ) {
                        await octokit.rest.actions.deleteSelfHostedRunnerFromRepo({
                            owner: repoOwner,
                            repo: repoName,
                            runner_id: runner.id,
                        });
                    }
                }
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();
