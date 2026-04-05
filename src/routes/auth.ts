import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'

const router = express.Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { password } = req.body

  const admin = await Admin.findOne()
  if (!admin) return res.status(404).json({ message: 'Admin not set up' })

  const isMatch = await bcrypt.compare(password, admin.passwordHash)
  if (!isMatch) return res.status(401).json({ message: 'Wrong password' })

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  })

  res.json({ token })
})

// POST /api/auth/setup  ← run this ONCE to create your admin password
router.post('/setup', async (req, res) => {
  const existing = await Admin.findOne()
  if (existing) return res.status(400).json({ message: 'Admin already exists' })

  const { password } = req.body
  const passwordHash = await bcrypt.hash(password, 12)
  await Admin.create({ passwordHash })

  res.json({ message: 'Admin created successfully' })
})

export default router
