/* eslint-disable no-console */

const fetch = require('node-fetch')
const chalk = require('chalk')
const ms = require('ms')

let cache = null

const log = text => console.log(text)
const logError = text => console.log(chalk.bold.red(text))

// Request options for all fetch calls
const options = {
    headers: {
        // For getting topics, see note on https://developer.github.com/v3/search/
        // Accept: 'application/vnd.github.mercy-preview+json'
        Accept: 'application/vnd.github.preview'
    }
}

//
// Fetch all public GitHub repos
//
const fetchRepos = async () => {
    const url = 'https://api.github.com/orgs/oceanprotocol/repos?type=public&per_page=100'
    const start = Date.now()
    const response = await fetch(url, options)

    if (response.status !== 200) {
        logError(`Non-200 response code from GitHub: ${response.status}`)
        return null
    }

    const json = await response.json()

    /* eslint-disable camelcase */
    const dataRepos = await json
        .map(({
            name,
            description,
            html_url,
            stargazers_count,
            forks_count,
            fork,
            archived,
            topics
        }) => ({
            name,
            description,
            url: html_url,
            stars: stargazers_count,
            forks: forks_count,
            isArchived: archived,
            isFork: fork,
            topics
        })).sort((p1, p2) => p2.stars - p1.stars)
    /* eslint-enable camelcase */

    log(
        `Re-built projects cache. ` +
        `Total: ${dataRepos.length} public Ocean Protocol projects. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return {
        data: dataRepos,
        lastUpdate: Date.now()
    }
}

//
// Create the response
//
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    if (!cache || Date.now() - cache.lastUpdate > ms('5m')) {
        // eslint-disable-next-line require-atomic-updates
        cache = await fetchRepos()
    }

    res.end(JSON.stringify(cache.data))
}
