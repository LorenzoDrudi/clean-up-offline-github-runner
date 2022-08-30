# Clean-up-offline-github-runners

[![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://en.wikipedia.org/wiki/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stable Version](https://img.shields.io/github/v/tag/LorenzoDrudi/clean-up-offline-github-runners)](https://img.shields.io/github/v/tag/LorenzoDrudi/clean-up-offline-github-runners)
[![Latest Release](https://img.shields.io/github/v/release/LorenzoDrudi/clean-up-offline-github-runners?color=%233D9970)](https://img.shields.io/github/v/release/LorenzoDrudi/clean-up-offline-github-runners?color=%233D9970)

JavaScript Github Action to clean up offline self-hosted runners linked to a repository.

1. [Prerequisites](#prerequisites)
2. [Explanation](#inputs)
3. [How-to-use](#example-usage)

## Prerequisites

1. You have a repository where you use self-hosted runners.
2. You have a [github app](https://github.com/pavlovic-ivan/ephemeral-github-runner/blob/main/QUICKSTART.md#github-app-setup) linked to that repository.
3. You have added secrets to your repository that are later used to set [environment variables](#environment-variables). More information on secrets: [How to set up secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

## Inputs

Everything below is required. There are no default values provided.

- `repo-name`: The name of the repository for which you want to clean up offline runners
- `repo-owner`: The owner of the repository for which you want to clean up offline runners

## Environment Variables

- `APP_ID`: GitHub App ID
- `APP_PRIVATE_KEY`: GitHub App Private Key

## Example Usage 

```yaml
name: clean-up-runners
on: <event on which the action has to start>
jobs:
    manage-runners:
        runs-on: ubuntu-latest
        steps:
          - uses: LorenzoDrudi/clean-up-offline-github-runners@<version to use>
            env:
              APP_ID: ${{ secrets.APP_ID }}
              APP_PRIVATE_KEY: ${{ secrets.APP_PRIVATE_KEY }}
            with:
              repo-name: <name of the repository for which you want to clean up offline runners>
              repo-owner: <owner of the repository for which you want to clean up offline runners>
```

All the personal inputs are passed by github secret. 
[See the docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

## Tags and Releases

A github action workflow automatically creates a Tag and a Release every push on the main branch. \
That's only a good DevOps practice, furthermore the main branch is protected and changes can come only over PR. \
The idea is to work on develop/features branches and when it's done merge to the main branch, so the workflow starts.

The default behaviour is to create a `minor` tag/release (e.g. 1.*.0), the schema is `<major_version>.<minor_version>.<patch_version>`. \
It's possible also to create major or patch tags/releases adding a tag at the end of the commit message:

- `#major` -> e.g. *.0.0
- `#patch` -> e.g. 1.1.*

For more info see the [references](#references).

## References

- Generated from: [JavaScript-Action](https://github.com/actions/javascript-action)
- To learn how to create a simple action, start here: [Hello-World-JavaScript-Action](https://github.com/actions/hello-world-javascript-action)
- Recommended documentation: [Creating a JavaScript Action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- Github action used to create a new tag: [github-tag-action](https://github.com/anothrNick/github-tag-action)
- Github Action used for the release: [action-gh-release](https://github.com/softprops/action-gh-release)
