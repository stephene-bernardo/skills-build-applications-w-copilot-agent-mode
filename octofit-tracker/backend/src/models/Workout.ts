import { model, models, Schema, type InferSchemaType } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'recovery'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
)

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>
export default models.Workout ?? model('Workout', workoutSchema)
