"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionHandler = void 0;
class HttpExceptionHandler {
    constructor(status, message, stack) {
        this.status = status;
        this.message = message;
        this.stack = stack;
    }
}
exports.HttpExceptionHandler = HttpExceptionHandler;
//# sourceMappingURL=http-exception.handler.js.map