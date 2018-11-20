[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://docs.oceanprotocol.com)

<h1 align="center">github-projects</h1>

> Microservice to cache and expose GitHub projects for use throughout [oceanprotocol.com](https://oceanprotocol.com).

[![Build Status](https://travis-ci.org/oceanprotocol/github-projects.svg?branch=master)](https://travis-ci.org/oceanprotocol/github-projects)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Greenkeeper badge](https://badges.greenkeeper.io/oceanprotocol/github-projects.svg)](https://greenkeeper.io/)
<img src="http://forthebadge.com/images/badges/powered-by-electricity.svg" height="20"/>
<img src="http://forthebadge.com/images/badges/as-seen-on-tv.svg" height="20"/>
<img src="http://forthebadge.com/images/badges/uses-badges.svg" height="20"/>

## API

Endpoint: [`https://oceanprotocol-github.now.sh`](https://oceanprotocol-github.now.sh)

### GET /

**200**: Returns a list of all public projects as follows

```json
[
  {
    "name": "project-name",
    "description": "The description",
    "stars": 3040,
    "forks": 293,
    "is_fork": false,
    "release": "v0.10.0",
    "release_url": "https://github.com/oceanprotocol/aquarius/releases/tag/v0.10.0",
    "url": "https://github.com/oceanprotocol/project",
    "topics": [
      "oceanprotocol",
      "oceanprotocol-driver",
      "python"
    ]
  }
]
```

## Development

Install dependencies:

```bash
npm install
```

And run the server:

```bash
npm start
```

## Test

Run the tests:

```bash
npm test
```

## Deployment

Deploy to [now](https://zeit.co/now), make sure to switch to BigchainDB org before deploying:

```bash
# first run
now login
now switch

# deploy
now
# switch alias to new deployment
now alias
```

## Authors

- Matthias Kretschmann ([@kremalicious](https://github.com/kremalicious)) - [Ocean Protocol](https://oceanprotocol.com)

Blatantly ~~copied from~~ inspired by [zeit/github-projects](https://github.com/zeit/github-projects)
