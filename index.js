/* eslint-disable camelcase, no-console */

const fetch = require('node-fetch')
const chalk = require('chalk')
const express = require('express')

const orgname = 'oceanprotocol'

const log = text => console.log(text)
const logError = text => console.log(chalk.bold.red(text))

// Request options for all fetch calls
const options = {
    headers: {
        // For getting topics, see note on https://developer.github.com/v3/search/
        Accept: 'application/vnd.github.mercy-preview+json'
        // Accept: 'application/vnd.github.preview'
    }
}

const url = 'https://api.github.com/orgs/' + orgname + '/repos?type=public&per_page=100'

//
// Fetch all public GitHub repos
//
const fetchRepos = async () => {
    const start = Date.now()

    try {
        const response = await fetch(url, options)
        const json = await response.json()

        if (json.message) {
            return json
        }

        const dataRepos = await json.map(({
            name,
            description,
            html_url,
            stargazers_count,
            forks_count,
            fork,
            topics
        }) => ({
            name,
            description,
            url: html_url,
            stars: stargazers_count,
            forks: forks_count,
            is_fork: fork,
            topics
        })).sort((p1, p2) => p2.stars - p1.stars)

        log(`Got ${json.length} public Ocean Protocol projects. ` +
            `Elapsed: ${(new Date() - start)}ms`)

        return dataRepos
    } catch (error) {
        logError('Error parsing response from GitHub: ' + error)
    }
}

//
// Create the response
//
const port = process.env.PORT || 3000
const app = express()

app.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    const data = await fetchRepos()

    res.send(data)
    res.end()
})

app.listen(port, err => {
    if (err) throw err
    log(`> Ready On Server http://localhost:${port}`)
})
