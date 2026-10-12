import { model, models, Schema, type InferSchemaType } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
)

leaderboardSchema.index({ user: 1, period: 1 }, { unique: true })

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>
export default models.Leaderboard ?? model('Leaderboard', leaderboardSchema)
