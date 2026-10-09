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

    const usersToSeed = [
      {
        name: 'Maya Chen',
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        bio: 'Weekend runner and trail enthusiast.',
      },
      {
        name: 'Jordan Rivera',
        username: 'jordan-rivera',
        email: 'jordan.rivera@example.com',
        bio: 'Strength training and cycling.',
      },
      {
        name: 'Alex Kim',
        username: 'alex-kim',
        email: 'alex.kim@example.com',
        bio: 'Building consistency one workout at a time.',
      },
    ]
    const usernames = usersToSeed.map(({ username }) => username)
    const existingUsers = await User.find({ username: { $in: usernames } }).select('_id').lean()

    const teamsToSeed = [
      {
        name: 'Trail Blazers',
        description: 'A friendly crew focused on running, riding, and recovery.',
        memberIndexes: [0, 1, 2],
      },
      {
        name: 'City Sprinters',
        description: 'Short, energetic workouts around the neighborhood.',
        memberIndexes: [1, 2],
      },
    ]
    const activitiesToSeed = [
      {
        userIndex: 0,
        teamIndex: 0,
        type: 'running',
        durationMinutes: 35,
        calories: 310,
        date: new Date('2026-10-08T07:30:00.000Z'),
        notes: 'Easy riverside run.',
      },
      {
        userIndex: 1,
        teamIndex: 0,
        type: 'cycling',
        durationMinutes: 50,
        calories: 420,
        date: new Date('2026-10-08T17:00:00.000Z'),
        notes: 'Steady ride after work.',
      },
      {
        userIndex: 2,
        teamIndex: 1,
        type: 'strength',
        durationMinutes: 40,
        calories: 260,
        date: new Date('2026-10-07T16:00:00.000Z'),
        notes: 'Full-body circuit.',
      },
    ]
    const leaderboardToSeed = [
      { userIndex: 0, teamIndex: 0, points: 840, rank: 1 },
      { userIndex: 1, teamIndex: 0, points: 710, rank: 2 },
      { userIndex: 2, teamIndex: 1, points: 590, rank: 3 },
    ]
    const period = '2026-W41'
    const workoutsToSeed = [
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

    await Activity.deleteMany({
      notes: { $in: activitiesToSeed.map(({ notes }) => notes) },
    })
    await Leaderboard.deleteMany({
      user: { $in: existingUsers.map(({ _id }) => _id) },
      period,
    })
    await Team.deleteMany({
      name: { $in: [...teamsToSeed.map(({ name }) => name), 'Trail Blazersss'] },
    })
    await User.deleteMany({ username: { $in: usernames } })
    await Workout.deleteMany({
      title: { $in: workoutsToSeed.map(({ title }) => title) },
    })

    const users = await User.insertMany(usersToSeed)
    const teams = await Team.insertMany(
      teamsToSeed.map(({ name, description, memberIndexes }) => ({
        name,
        description,
        members: memberIndexes.map((index) => users[index]._id),
      })),
    )
    await Activity.insertMany(
      activitiesToSeed.map(({ userIndex, teamIndex, ...activity }) => ({
        ...activity,
        user: users[userIndex]._id,
        team: teams[teamIndex]._id,
      })),
    )
    await Leaderboard.insertMany(
      leaderboardToSeed.map(({ userIndex, teamIndex, ...entry }) => ({
        ...entry,
        user: users[userIndex]._id,
        team: teams[teamIndex]._id,
        period,
      })),
    )
    await Workout.insertMany(workoutsToSeed)

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts.')
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding octofit_db:', error)
  process.exitCode = 1
})
