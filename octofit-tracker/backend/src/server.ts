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

app.use(express.json())

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
