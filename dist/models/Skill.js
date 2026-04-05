"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skillSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "Frontend", "Backend"
    iconUrl: { type: String },
    level: { type: Number, min: 1, max: 100 },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Skill', skillSchema);
