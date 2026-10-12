import { model, models, Schema, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    bio: { type: String, default: '' },
  },
  { timestamps: true },
)

export type UserDocument = InferSchemaType<typeof userSchema>
export default models.User ?? model('User', userSchema)
