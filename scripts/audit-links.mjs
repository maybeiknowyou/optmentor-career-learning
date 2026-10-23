import { createServer } from 'vite'

async function auditLinks() {
  console.log('================================================================')
  console.log('OptMentor Phase 3 — Link & URL Audit')
  console.log('================================================================\n')

  const server = await createServer({ server: { middlewareMode: true } })
  const { resources } = await server.ssrLoadModule('./src/data/resources.ts')

  console.log(`Auditing ${resources.length} resources in catalog...\n`)

  const results = []
  const brokenOrForbidden = []
  const forbiddenDomains = ['bharatskills.gov.in', 'skillindiadigital.gov.in']

  for (let i = 0; i < resources.length; i++) {
    const res = resources[i]
    let hostname = ''
    try {
      hostname = new URL(res.url).hostname
    } catch {
      hostname = 'invalid-url'
    }

    const isForbiddenDomain = forbiddenDomains.some((d) => hostname.includes(d))

    const itemResult = {
      index: i + 1,
      id: res.id,
      careerId: res.careerId,
      title: res.title,
      provider: res.provider,
      url: res.url,
      hostname,
      isForbiddenDomain,
      status: null,
      finalUrl: null,
      error: null,
      verdict: 'OK',
    }

    if (isForbiddenDomain) {
      itemResult.verdict = 'FORBIDDEN_DOMAIN'
      brokenOrForbidden.push(itemResult)
      console.log(`[FORBIDDEN] #${i + 1} [${res.careerId}] ${res.title}`)
      console.log(`  URL: ${res.url}`)
      console.log(`  Reason: Inaccessible portal specified by user (${hostname})\n`)
    } else {
      // Test URL with fetch
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 6000)

        const response = await fetch(res.url, {
          method: 'GET',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
          redirect: 'follow',
          signal: controller.signal,
        })
        clearTimeout(timeout)

        itemResult.status = response.status
        itemResult.finalUrl = response.url

        if (response.status >= 400) {
          itemResult.verdict = 'HTTP_ERROR'
          brokenOrForbidden.push(itemResult)
          console.log(`[HTTP ${response.status}] #${i + 1} [${res.careerId}] ${res.title} -> ${res.url}`)
        } else {
          itemResult.verdict = 'ACCESSIBLE'
        }
      } catch (err) {
        itemResult.error = err.message
        itemResult.verdict = 'CONNECTION_FAILED'
        brokenOrForbidden.push(itemResult)
        console.log(`[CONN FAIL] #${i + 1} [${res.careerId}] ${res.title}`)
        console.log(`  URL: ${res.url}`)
        console.log(`  Error: ${err.message}\n`)
      }
    }

    results.push(itemResult)
  }

  await server.close()

  console.log('================================================================')
  console.log(`Audit Finished: ${results.length} Total URLs Tested`)
  console.log(`Broken or Forbidden URLs: ${brokenOrForbidden.length}`)
  console.log('================================================================\n')

  return { results, brokenOrForbidden }
}

auditLinks()
