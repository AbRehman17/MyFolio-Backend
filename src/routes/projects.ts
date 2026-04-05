import express from 'express'
import Project from '../models/Project'
import { protect } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

// Public
router.get('/', async (_req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 })
  res.json(projects)
})

// Admin
router.post('/', protect, upload.single('image'), async (req, res) => {
  const data: any = { ...req.body }
  if (req.file) data.imageUrl = (req.file as any).path
  // techStack comes as comma-separated string from form
  if (typeof data.techStack === 'string') {
    data.techStack = data.techStack.split(',').map((s: string) => s.trim())
  }
  const project = await Project.create(data)
  res.status(201).json(project)
})

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  const data: any = { ...req.body }
  if (req.file) data.imageUrl = (req.file as any).path
  if (typeof data.techStack === 'string') {
    data.techStack = data.techStack.split(',').map((s: string) => s.trim())
  }
  const project = await Project.findByIdAndUpdate(req.params.id, data, {
    new: true,
  })
  res.json(project)
})

router.delete('/:id', protect, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.json({ message: 'Project deleted' })
})

export default router
