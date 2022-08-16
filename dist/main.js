"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const apiRoutesPath = __dirname + "/api";
// this function goes over all files & sets them as callback fns for their routes (nextjs-inspired)
function initializeRoutes(routesPath) {
    const routeFiles = fs_1.default.readdirSync(routesPath);
    const baseRoute = routesPath.slice(routesPath.indexOf("api")).replace("api", "/");
    routeFiles.forEach((routeFile) => {
        if (!routeFile.includes(".")) {
            return initializeRoutes(routesPath + "/" + routeFile);
        }
        const route = (baseRoute + "/" + routeFile.slice(0, -3)).replace("//", "/");
        const handlerFnPath = __dirname + "/api" + (baseRoute + "/" + routeFile).replace("//", "/");
        app.all(route, require(handlerFnPath).default);
    });
}
initializeRoutes(apiRoutesPath);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT, () => console.log("listening at", process.env.PORT));
