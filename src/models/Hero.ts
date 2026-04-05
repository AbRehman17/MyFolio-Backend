import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    bio: { type: String },
    photoUrl: { type: String },
    resumeUrl: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
  },
  { timestamps: true },
)

export default mongoose.model('Hero', heroSchema)
