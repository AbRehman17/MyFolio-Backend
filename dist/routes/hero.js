"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Hero_1 = __importDefault(require("../models/Hero"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// Public
router.get('/', async (_req, res) => {
    const hero = await Hero_1.default.findOne();
    res.json(hero);
});
// Admin — update hero (with optional photo upload)
router.put('/', auth_1.protect, upload_1.upload.single('photo'), async (req, res) => {
    const data = { ...req.body };
    if (req.file)
        data.photoUrl = req.file.path;
    const hero = await Hero_1.default.findOneAndUpdate({}, data, {
        new: true,
        upsert: true, // creates if doesn't exist
    });
    res.json(hero);
});
exports.default = router;
