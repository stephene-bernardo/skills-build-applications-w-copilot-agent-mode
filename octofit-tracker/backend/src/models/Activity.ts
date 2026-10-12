import { model, models, Schema, type InferSchemaType } from 'mongoose'

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'strength'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
)

export type ActivityDocument = InferSchemaType<typeof activitySchema>
export default models.Activity ?? model('Activity', activitySchema)
