import * as common from 'common'
import fetch from 'node-fetch'
import nanogql = require('nanographql')

export interface ScrapeDatabaseOptions {
  denolandiaAdminToken?: string
  denolandiaGraphqlApiEndpoint?: string
  githubGraphqlApiEndpont?: string
  githubToken?: string
  leadingEdge?: boolean
  packagesUrl?: string
  poll?: boolean
}

export async function scrapeDatabase (opts?: ScrapeDatabaseOptions) {
  const {
    denolandiaAdminToken = '',
    denolandiaGraphqlApiEndpoint = '',
    githubGraphqlApiEndpont = '',
    githubToken = '',
    leadingEdge = false,
    packagesUrl = 'https://raw.githubusercontent.com/denoland/registry/master/src/database.json',
    poll = false
  } =
    opts || {}

  const finalGithubGraphqlApiEndpont =
    githubGraphqlApiEndpont || process.env.GITHUB_GRAPHQL_API_ENDPOINT || 'https://api.github.com/graphql'
  const finalGithubToken = githubToken || process.env.GITHUB_TOKEN
  const finalDenolandiaGraphqlApiEndpoint =
    denolandiaGraphqlApiEndpoint || process.env.DENOLANDIA_GRAPHQL_API_ENDPOINT || 'http://localhost:9090/graphql'
  const finalDenolandiaAdminToken = denolandiaAdminToken || process.env.DENOLANDIA_ADMIN_TOKEN!

  if (!finalGithubToken) throw new Error('GITHUB_TOKEN missing')
  if (!finalDenolandiaAdminToken) {
    throw new Error('DENOLANDIA_ADMIN_TOKEN missing')
  }

  if (poll && !leadingEdge) {
    setTimeout(() => scrapeDatabase({ ...(opts || {}), leadingEdge: false }), 30 * 1000 * 60)
  }
  const toScrape = await (await fetch(packagesUrl)).json()
  for (const name in toScrape) {
    try {
      await scrape({
        denolandiaEndpont: finalDenolandiaGraphqlApiEndpoint,
        denolandiaAdminToken: finalDenolandiaAdminToken,
        name,
        url: toScrape[name].url,
        githubToken: finalGithubToken,
        githubEndpoint: finalGithubGraphqlApiEndpont
      })
    } catch (err) {
      console.error(`failed to scrape ${name}`, err)
    }
    await new Promise(res => setTimeout(res, 1000))
  }
}

export interface ScrapeOptions {
  name: string
  url: string
  githubToken: string
  githubEndpoint: string
  denolandiaEndpont: string
  denolandiaAdminToken: string
}

export async function scrape (opts: ScrapeOptions) {
  const { name, url = '', githubToken, githubEndpoint, denolandiaEndpont, denolandiaAdminToken } = opts
  if (!url.match(/github/)) {
    console.warn(`unable to scrape ${url}. can only scrape github projects`)
    return
  }
  const [org, project] = url.split('.com/')[1].split('/')
  console.log(`attemping upsert on: ${name}@${org}/${project}`)
  const body = nanogql(QUERY(org, project))()
  const res = await fetch(githubEndpoint, {
    method: 'post',
    body,
    headers: {
      Authorization: `bearer ${githubToken}`
    }
  })
  if (res.status >= 300) {
    throw new Error(`failed get fetch project data [http: ${res.status}]. github status text: ${res.statusText}`)
  }
  const meta = await res.json()
  const {
    repository: {
      descriptionHTML,
      homepageUrl,
      repositoryTopics: { edges: topicEdges },
      issues: { totalCount: issueCount },
      licenseInfo: { spdxId: licenseSpdxId },
      stargazers: { totalCount: stargazerCount },
      url: repositoryUrl,
      releases: { edges: releaseEdges }
    }
  } = meta.data
  const upsertBody = common.gql.queries.packages.upsertPackageBody({
    descriptionHtml: descriptionHTML,
    homepageUrl,
    issueCount,
    latestRelease: releaseEdges.length ? topicEdges[0].node.name : null,
    licenseSpdxId,
    name,
    organizationName: org,
    projectName: project,
    stargazerCount,
    topics: JSON.stringify(
      topicEdges.map((edge: any) => {
        if (!edge.node.topic.name) {
          throw new Error(`expected topic in node object, received: ${JSON.stringify(edge.node)}`)
        }
        return edge.node.topic.name
      })
    ),
    repositoryUrl
  })
  const upserted = await fetch(denolandiaEndpont, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      id_token: denolandiaAdminToken
    },
    body: upsertBody
  })
  if (upserted.status >= 300) {
    throw new Error(`failed to upsert: ${upserted.statusText}`)
  }
  const upsertedJson = await upserted.json()
  if (upsertedJson && upsertedJson.errors) {
    throw new Error(upsertedJson.errors.map((err: Error) => err.message).join('\n'))
  }
  console.log(`upserted ${name}@${org}/${project}`)
}

const QUERY = (org: string, project: string) => `
query {
  repository(owner: "${org}", name: "${project}") {
      descriptionHTML
      homepageUrl
      repositoryTopics(first: 10) {
        edges {
          node {
            topic {
              name
            }
          }
        }
      }
      issues {
        totalCount
      }
      stargazers {
         totalCount
      }
      licenseInfo {
        spdxId
      }
      releases(last: 1) {
        edges {
          node {
            name
          }
        }
    	}
      url
  }
}
`
