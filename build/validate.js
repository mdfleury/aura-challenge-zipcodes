"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
async function validateOptions(options) {
    if ((options.lat && !options.long) || (options.long && !options.lat)) {
        throw new Error('Bad options');
    }
}
exports.validateOptions = validateOptions;
//# sourceMappingURL=validate.js.map