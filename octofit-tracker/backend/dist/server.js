"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.baseUrl = baseUrl;
app.use(express_1.default.json());
app.get('/api/users', (_request, response) => {
    response.json([]);
});
app.get('/api/activities', (_request, response) => {
    response.json([]);
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Octofit API listening at ${baseUrl}`);
});
