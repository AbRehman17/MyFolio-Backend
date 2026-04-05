import express from 'express'
import Hero from '../models/Hero'
import { protect } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

// Public
router.get('/', async (_req, res) => {
  const hero = await Hero.findOne()
  res.json(hero)
})

// Admin — update hero (with optional photo upload)
router.put('/', protect, upload.single('photo'), async (req, res) => {
  const data: any = { ...req.body }
  if (req.file) data.photoUrl = (req.file as any).path

  const hero = await Hero.findOneAndUpdate({}, data, {
    new: true,
    upsert: true, // creates if doesn't exist
  })

  res.json(hero)
})

export default router
