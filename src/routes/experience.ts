import express from 'express'
import Experience from '../models/Experience'
import { protect } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

// Public
router.get('/', async (_req, res) => {
  const experience = await Experience.find().sort({ startDate: -1 })
  res.json(experience)
})

// Admin
router.post('/', protect, upload.single('logo'), async (req, res) => {
  const data: any = { ...req.body }
  if (req.file) data.logoUrl = (req.file as any).path
  const exp = await Experience.create(data)
  res.status(201).json(exp)
})

router.put('/:id', protect, upload.single('logo'), async (req, res) => {
  const data: any = { ...req.body }
  if (req.file) data.logoUrl = (req.file as any).path
  const exp = await Experience.findByIdAndUpdate(req.params.id, data, {
    new: true,
  })
  res.json(exp)
})

router.delete('/:id', protect, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id)
  res.json({ message: 'Experience deleted' })
})

export default router
