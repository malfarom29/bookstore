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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidationHandler = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function requestValidationHandler(dto) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const params = (0, class_transformer_1.plainToClass)(dto, body);
            const errors = yield (0, class_validator_1.validate)(params);
            if (errors.length > 0) {
                return res.status(422).json({
                    statusCode: 422,
                    errors: errors
                        .map(({ constraints }) => {
                        if (typeof constraints === 'object') {
                            return Object.values(constraints);
                        }
                    })
                        .flat(),
                });
            }
            next();
        });
    };
}
exports.requestValidationHandler = requestValidationHandler;
//# sourceMappingURL=validation.handler.js.map