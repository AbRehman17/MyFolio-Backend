"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Skill_1 = __importDefault(require("../models/Skill"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// Public
router.get('/', async (_req, res) => {
    const skills = await Skill_1.default.find().sort({ category: 1 });
    res.json(skills);
});
// Admin
router.post('/', auth_1.protect, upload_1.upload.single('icon'), async (req, res) => {
    const data = { ...req.body };
    if (req.file)
        data.iconUrl = req.file.path;
    const skill = await Skill_1.default.create(data);
    res.status(201).json(skill);
});
router.put('/:id', auth_1.protect, upload_1.upload.single('icon'), async (req, res) => {
    const data = { ...req.body };
    if (req.file)
        data.iconUrl = req.file.path;
    const skill = await Skill_1.default.findByIdAndUpdate(req.params.id, data, {
        new: true,
    });
    res.json(skill);
});
router.delete('/:id', auth_1.protect, async (req, res) => {
    await Skill_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
});
exports.default = router;
