"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isValidRequest = (req) => {
    var _a;
    let userId;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        userId = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        console.log(err);
        userId = null;
    }
    return userId;
};
exports.isValidRequest = isValidRequest;
