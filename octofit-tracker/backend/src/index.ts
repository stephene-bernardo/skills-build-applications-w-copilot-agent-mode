import { connectDatabase } from './config/database'
import app from './server'

const port = Number(process.env.PORT) || 8000

async function startServer(): Promise<void> {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`Octofit Tracker API listening on port ${port}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Unable to start Octofit Tracker API:', error)
  process.exitCode = 1
})
