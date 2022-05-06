"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
const class_transformer_1 = require("class-transformer");
function serialize(dto, data) {
    if (Array.isArray(data)) {
        return data.map((d) => (0, class_transformer_1.instanceToInstance)((0, class_transformer_1.plainToClass)(dto, d, { excludeExtraneousValues: true })));
    }
    return (0, class_transformer_1.instanceToInstance)((0, class_transformer_1.plainToClass)(dto, data, { excludeExtraneousValues: true }));
}
exports.serialize = serialize;
//# sourceMappingURL=serialize.js.map