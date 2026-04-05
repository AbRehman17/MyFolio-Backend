import dotenv from 'dotenv'
dotenv.config()

// ALL other imports AFTER dotenv
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db'

import authRoutes from './routes/auth'
import heroRoutes from './routes/hero'
import skillsRoutes from './routes/skills'
import projectsRoutes from './routes/projects'
import experienceRoutes from './routes/experience'

connectDB()

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || [
      'http://localhost:3000',
      'https://my-folio-frontend-1790l80uf-abdurehmans-projects-9f85669a.vercel.app',
    ],
    credentials: true,
  }),
)
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/hero', heroRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/experience', experienceRoutes)

app.get('/', (_req, res) => res.send('API is running'))

// ✅ REMOVE these lines:
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// ✅ ADD this instead (export for Vercel):
export default app
