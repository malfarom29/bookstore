"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const client_1 = require("@prisma/client");
const books_routes_1 = __importDefault(require("./books/books.routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT;
const prismaClient = new client_1.PrismaClient();
app.use(body_parser_1.default.json());
app.use('/books', (0, books_routes_1.default)(prismaClient));
app.get('/', (_req, res) => {
    res.send('Hello world!');
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map