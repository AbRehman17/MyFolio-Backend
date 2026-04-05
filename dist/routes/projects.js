"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Project_1 = __importDefault(require("../models/Project"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// Public
router.get('/', async (_req, res) => {
    const projects = await Project_1.default.find().sort({ featured: -1, createdAt: -1 });
    res.json(projects);
});
// Admin
router.post('/', auth_1.protect, upload_1.upload.single('image'), async (req, res) => {
    const data = { ...req.body };
    if (req.file)
        data.imageUrl = req.file.path;
    // techStack comes as comma-separated string from form
    if (typeof data.techStack === 'string') {
        data.techStack = data.techStack.split(',').map((s) => s.trim());
    }
    const project = await Project_1.default.create(data);
    res.status(201).json(project);
});
router.put('/:id', auth_1.protect, upload_1.upload.single('image'), async (req, res) => {
    const data = { ...req.body };
    if (req.file)
        data.imageUrl = req.file.path;
    if (typeof data.techStack === 'string') {
        data.techStack = data.techStack.split(',').map((s) => s.trim());
    }
    const project = await Project_1.default.findByIdAndUpdate(req.params.id, data, {
        new: true,
    });
    res.json(project);
});
router.delete('/:id', auth_1.protect, async (req, res) => {
    await Project_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
});
exports.default = router;
