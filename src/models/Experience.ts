import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String }, // null = "Present"
    description: { type: String },
    logoUrl: { type: String },
    // achievements?: [{ type: String }]
  },
  { timestamps: true },
)

export default mongoose.model('Experience', experienceSchema)
