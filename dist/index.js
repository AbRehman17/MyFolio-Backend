"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ALL other imports AFTER dotenv
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const hero_1 = __importDefault(require("./routes/hero"));
const skills_1 = __importDefault(require("./routes/skills"));
const projects_1 = __importDefault(require("./routes/projects"));
const experience_1 = __importDefault(require("./routes/experience"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || [
        'http://localhost:3000',
        'https://my-folio-frontend-1790l80uf-abdurehmans-projects-9f85669a.vercel.app',
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/hero', hero_1.default);
app.use('/api/skills', skills_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/experience', experience_1.default);
app.get('/', (_req, res) => res.send('API is running'));
// ✅ REMOVE these lines:
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// ✅ ADD this instead (export for Vercel):
exports.default = app;
