import express from 'express'
import Skill from '../models/Skill'
import { protect } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

// Public
router.get('/', async (_req, res) => {
  const skills = await Skill.find().sort({ category: 1 })
  res.json(skills)
})

// Admin
router.post('/', protect, upload.single('icon'), async (req, res) => {
  const data: any = { ...req.body }
  if (req.file) data.iconUrl = (req.file as any).path
  const skill = await Skill.create(data)
  res.status(201).json(skill)
})

router.put('/:id', protect, upload.single('icon'), async (req, res) => {
  const data: any = { ...req.body }
  if (req.file) data.iconUrl = (req.file as any).path
  const skill = await Skill.findByIdAndUpdate(req.params.id, data, {
    new: true,
  })
  res.json(skill)
})

router.delete('/:id', protect, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id)
  res.json({ message: 'Skill deleted' })
})

export default router
