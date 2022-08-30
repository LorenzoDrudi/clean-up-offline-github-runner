const core = require('@actions/core');
const { App } = require("@octokit/app");

async function run() {

    try {
        const REPO_OWNER = core.getInput('repo-owner');
        const REPO_NAME = core.getInput('repo-name');

        // Log in
        const app = new App({
            appId: process.env.APP_ID,
            privateKey: process.env.APP_PRIVATE_KEY,
        });
        
        // List all the repository where the App is installed
        for await (const { octokit, repository } of app.eachRepository.iterator()) {
            if (repository.owner.login === REPO_OWNER && repository.name === REPO_NAME) {
                const runners = (await octokit.request('GET /repos/{owner}/{repo}/actions/runners', {
                    owner: REPO_OWNER,
                    repo: REPO_NAME
                })).data.runners;
                // Delete all the offline self-hosted runners from the repository
                for (const runner of runners) {
                    if (runner.status === "offline" ) {
                        await octokit.request('DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}', {
                            owner: REPO_OWNER,
                            repo: REPO_NAME,
                            runner_id: runner.id
                        });
                        core.notice(`Removed offline self-hosted runner ${runner.id} (${runner.name})`);
                    }
                }
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();
