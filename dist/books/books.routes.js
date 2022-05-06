"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_handler_1 = require("../common/validation.handler");
const books_controller_1 = __importStar(require("./books.controller"));
const book_create_dto_1 = require("./dtos/request/book-create.dto");
exports.default = (prismaClient) => {
    const router = (0, express_1.Router)();
    const booksController = (0, books_controller_1.default)(prismaClient);
    router.route('').get(booksController.findAllBooks);
    router.route('/:id').get((0, books_controller_1.findOneBook)(prismaClient));
    router.route('/:id').delete((0, books_controller_1.deleteBook)(prismaClient));
    router
        .route('')
        .post((0, validation_handler_1.requestValidationHandler)(book_create_dto_1.BookCreateDto), booksController.createBook);
    return router;
};
//# sourceMappingURL=books.routes.js.map