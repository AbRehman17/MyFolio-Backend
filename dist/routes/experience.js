"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Experience_1 = __importDefault(require("../models/Experience"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// Public
router.get('/', async (_req, res) => {
    const experience = await Experience_1.default.find().sort({ startDate: -1 });
    res.json(experience);
});
// Admin
router.post('/', auth_1.protect, upload_1.upload.single('logo'), async (req, res) => {
    const data = { ...req.body };
    if (req.file)
        data.logoUrl = req.file.path;
    const exp = await Experience_1.default.create(data);
    res.status(201).json(exp);
});
router.put('/:id', auth_1.protect, upload_1.upload.single('logo'), async (req, res) => {
    const data = { ...req.body };
    if (req.file)
        data.logoUrl = req.file.path;
    const exp = await Experience_1.default.findByIdAndUpdate(req.params.id, data, {
        new: true,
    });
    res.json(exp);
});
router.delete('/:id', auth_1.protect, async (req, res) => {
    await Experience_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
});
exports.default = router;
