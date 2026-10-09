import mongoose from 'mongoose';
import Activity from '../models/Activity'
import Leaderboard from '../models/Leaderboard'
import Team from '../models/Team'
import User from '../models/User'
import Workout from '../models/Workout'

const connectionString =
  process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase(): Promise<void> {
  await mongoose.connect(connectionString)
  try {
    console.log('Connected to octofit_db')

    const users = await Promise.all([
      User.findOneAndUpdate(
        { username: 'maya-chen' },
        {
          name: 'Maya Chen',
          username: 'maya-chen',
          email: 'maya.chen@example.com',
          bio: 'Weekend runner and trail enthusiast.',
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { username: 'jordan-rivera' },
        {
          name: 'Jordan Rivera',
          username: 'jordan-rivera',
          email: 'jordan.rivera@example.com',
          bio: 'Strength training and cycling.',
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { username: 'alex-kim' },
        {
          name: 'Alex Kim',
          username: 'alex-kim',
          email: 'alex.kim@example.com',
          bio: 'Building consistency one workout at a time.',
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ])

    const team = await Team.findOneAndUpdate(
      { name: 'Trail Blazersss' },
      {
        name: 'Trail Blazersss',
        description: 'A friendly crew focused on running, riding, and recovery.',
        members: users.map((user) => user._id),
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    )

    const otherTeam = await Team.findOneAndUpdate(
      { name: 'City Sprinters' },
      {
        name: 'City Sprinters',
        description: 'Short, energetic workouts around the neighborhood.',
        members: [users[1]._id, users[2]._id],
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    )

    const activities = [
      {
        user: users[0]._id,
        team: team._id,
        type: 'running',
        durationMinutes: 35,
        calories: 310,
        date: new Date('2026-10-08T07:30:00.000Z'),
        notes: 'Easy riverside run.',
      },
      {
        user: users[1]._id,
        team: team._id,
        type: 'cycling',
        durationMinutes: 50,
        calories: 420,
        date: new Date('2026-10-08T17:00:00.000Z'),
        notes: 'Steady ride after work.',
      },
      {
        user: users[2]._id,
        team: otherTeam._id,
        type: 'strength',
        durationMinutes: 40,
        calories: 260,
        date: new Date('2026-10-07T16:00:00.000Z'),
        notes: 'Full-body circuit.',
      },
    ]

    await Promise.all(
      activities.map(({ user, date, type, ...activity }) =>
        Activity.findOneAndUpdate(
          { user, date, type },
          { user, date, type, ...activity },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    )

    const leaderboardEntries = [
      { user: users[0], team, points: 840, rank: 1 },
      { user: users[1], team, points: 710, rank: 2 },
      { user: users[2], team: otherTeam, points: 590, rank: 3 },
    ]
    await Promise.all(
      leaderboardEntries.map(({ user, team: entryTeam, points, rank }) =>
        Leaderboard.findOneAndUpdate(
          { user: user._id, period: '2026-W41' },
          { user: user._id, team: entryTeam._id, points, rank, period: '2026-W41' },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    )

    const workouts = [
      {
        title: 'Beginner Tempo Run',
        description: 'A conversational warm-up followed by short controlled tempo intervals.',
        category: 'cardio',
        durationMinutes: 30,
        difficulty: 'beginner',
        exercises: ['5-minute brisk walk', '4 x 3-minute tempo run', '5-minute cool-down walk'],
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'A balanced circuit using bodyweight movements and short rests.',
        category: 'strength',
        durationMinutes: 35,
        difficulty: 'intermediate',
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank holds'],
      },
      {
        title: 'Post-Ride Mobility',
        description: 'Gentle mobility work to restore range of motion after a ride.',
        category: 'flexibility',
        durationMinutes: 15,
        difficulty: 'beginner',
        exercises: ['Hip flexor stretch', 'Hamstring stretch', 'Thoracic rotations'],
      },
    ]

    await Promise.all(
      workouts.map(({ title, ...workout }) =>
        Workout.findOneAndUpdate(
          { title },
          { title, ...workout },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    )

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts.')
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding octofit_db:', error)
  process.exitCode = 1
})
