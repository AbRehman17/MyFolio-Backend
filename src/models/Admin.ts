import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  passwordHash: { type: String, required: true },
})

export default mongoose.model('Admin', adminSchema)
