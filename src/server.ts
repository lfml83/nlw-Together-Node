import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            return response.status(400).json({
                error: err.message,
            });
        }
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
);

/**
 * Rout Params => http://localhost:3000/produtos/:id_produtos
 * Query Params=>http:/loalhost:3000/produtos?chave=valor
 *
 * Body Params=> No corpo da requisição
 */

app.listen(3000, () => console.log("Server is running!"));