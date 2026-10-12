import { model, models, Schema, type InferSchemaType } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

export type TeamDocument = InferSchemaType<typeof teamSchema>
export default models.Team ?? model('Team', teamSchema)
