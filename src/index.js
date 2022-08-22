const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

async function run() {

    try {

        const repoOwner = core.getInput('repo-owner');
        const repoName = core.getInput('repo-name');
        const personalAccessToken = core.getInput('personal-access-token');
        let outputMessage = 'Deleted Runners IDs: ';

        // Log in
        const octokit = new Octokit({
            auth: personalAccessToken
        });

        // List self-hosted runners for a repository
        const runners = (await octokit.request('GET /repos/{owner}/{repo}/actions/runners', {
            owner: repoOwner,
            repo: repoName
        })).data.runners;

        console.log(runners);

        // Delete a self-hosted runner from a repository
        for (const runner in runners) {
            console.log(runner);
            if (runner.status === "offline" ){
                console.log(runner)
                await octokit.request('DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}', {
                    owner: repoOwner,
                    repo: repoName,
                    runner_id: runner.id
                });
    
                outputMessage += runner.id;
                outputMessage += ', ';
            }
        }

        // simple formating to make it look good: remove the last comma and adding a dot
        outputMessage = outputMessage.trim().slice(0, -1);
        outputMessage += '.';
        core.setOutput("output-message", outputMessage);

    } catch (error) {
        core.setFailed(error.message);
    }
}
run();
