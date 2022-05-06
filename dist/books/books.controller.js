"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.createBook = exports.findOneBook = exports.findAllBooks = void 0;
const utils_1 = require("../common/utils");
const book_service_1 = __importDefault(require("./book.service"));
const book_dto_1 = require("./dtos/response/book.dto");
exports.default = (prismaClient) => {
    const bookService = (0, book_service_1.default)(prismaClient);
    return {
        findAllBooks: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield bookService.findAll();
            return res.status(200).json({ data: (0, utils_1.serialize)(book_dto_1.BookDto, data) });
        }),
        findOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { params: { id }, } = req;
            const data = yield bookService.findOne(Number(id));
            if (!data) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Book not found',
                });
            }
            return res.status(200).json({ data: (0, utils_1.serialize)(book_dto_1.BookDto, data) });
        }),
        createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { body } = req;
            const data = yield bookService.create(body);
            return res.status(201).json({ data: (0, utils_1.serialize)(book_dto_1.BookDto, data) });
        }),
    };
};
function findAllBooks(client) {
    return function (_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield client.book.findMany({ include: { author: true } });
            return res.send({ data: (0, utils_1.serialize)(book_dto_1.BookDto, data) });
        });
    };
}
exports.findAllBooks = findAllBooks;
function findOneBook(client) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id }, } = req;
            const data = yield client.book.findUnique({ where: { id: Number(id) } });
            return res.json({ data: (0, utils_1.serialize)(book_dto_1.BookDto, data) });
        });
    };
}
exports.findOneBook = findOneBook;
function createBook(client) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const data = yield client.book.create({
                data: body,
                include: { author: true },
            });
            return res.json({ data: (0, utils_1.serialize)(book_dto_1.BookDto, data) });
        });
    };
}
exports.createBook = createBook;
function deleteBook(client) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const book = yield client.book.delete({ where: { id } });
                return res.status(204);
            }
            catch (error) {
                return res.status(404).send({
                    message: 'Book not found',
                });
            }
        });
    };
}
exports.deleteBook = deleteBook;
//# sourceMappingURL=books.controller.js.map