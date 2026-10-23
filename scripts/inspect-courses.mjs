import { createServer } from 'vite'

async function inspect() {
  const server = await createServer({ server: { middlewareMode: true } })
  const { resources } = await server.ssrLoadModule('./src/data/resources.ts')
  
  console.log('Sample 1 (Cybersecurity):', JSON.stringify(resources[0], null, 2))
  console.log('Sample 2 (Agriculture):', JSON.stringify(resources.find(r => r.careerId === 'agriculture-agritech'), null, 2))
  await server.close()
}

inspect().catch(console.error)
