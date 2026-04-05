import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "Frontend", "Backend"
    iconUrl: { type: String },
    level: { type: Number, min: 1, max: 100 },
  },
  { timestamps: true },
)

export default mongoose.model('Skill', skillSchema)
