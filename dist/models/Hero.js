"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const heroSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    bio: { type: String },
    photoUrl: { type: String },
    resumeUrl: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Hero', heroSchema);
