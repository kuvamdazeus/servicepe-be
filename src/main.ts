import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

const apiRoutesPath = __dirname + "/api";

// this function goes over all files & sets them as callback fns for their routes (nextjs-inspired)
function initializeRoutes(routesPath: string) {
  const routeFiles = fs.readdirSync(routesPath);
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

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => console.log("listening at", process.env.PORT));
