import express, { type ErrorRequestHandler } from 'express'
import Activity from './models/Activity'
import Leaderboard from './models/Leaderboard'
import Team from './models/Team'
import User from './models/User'
import Workout from './models/Workout'

const app = express()
const codespaceName = process.env.CODESPACE_NAME
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
])

app.use(express.json())
app.use((request, response, next) => {
  const origin = request.get('origin')
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }

  if (request.method === 'OPTIONS') {
    return response.sendStatus(origin && allowedOrigins.has(origin) ? 204 : 403)
  }

  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().select('-__v').lean())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name username').select('-__v').lean())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(
    await Activity.find()
      .populate('user', 'name username')
      .populate('team', 'name')
      .select('-__v')
      .sort({ date: -1 })
      .lean(),
  )
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user', 'name username')
      .populate('team', 'name')
      .select('-__v')
      .sort({ period: -1, rank: 1 })
      .lean(),
  )
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().select('-__v').sort({ title: 1 }).lean())
})

const handleApiError: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error)
  response.status(500).json({ error: 'Internal server error' })
}

app.use(handleApiError)

export default app
