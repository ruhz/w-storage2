"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
// 定义一个简单的路由
app.get('/', (req, res) => {
    console.log("requer /, ", __dirname);
    res.send('This server runing!8');
    // res.sendFile(__dirname + '/template/index.html');
});
exports.default = app;
