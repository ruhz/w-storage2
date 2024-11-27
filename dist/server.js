"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * nodemon
 * npx nodemon bs-config.js
 */
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const server = express_1.default();
const port = process.env.PORT || 3000;
server.use(app_1.default);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
