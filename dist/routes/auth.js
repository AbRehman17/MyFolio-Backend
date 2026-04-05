"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const router = express_1.default.Router();
// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { password } = req.body;
    const admin = await Admin_1.default.findOne();
    if (!admin)
        return res.status(404).json({ message: 'Admin not set up' });
    const isMatch = await bcryptjs_1.default.compare(password, admin.passwordHash);
    if (!isMatch)
        return res.status(401).json({ message: 'Wrong password' });
    const token = jsonwebtoken_1.default.sign({ admin: true }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    res.json({ token });
});
// POST /api/auth/setup  ← run this ONCE to create your admin password
router.post('/setup', async (req, res) => {
    const existing = await Admin_1.default.findOne();
    if (existing)
        return res.status(400).json({ message: 'Admin already exists' });
    const { password } = req.body;
    const passwordHash = await bcryptjs_1.default.hash(password, 12);
    await Admin_1.default.create({ passwordHash });
    res.json({ message: 'Admin created successfully' });
});
exports.default = router;
