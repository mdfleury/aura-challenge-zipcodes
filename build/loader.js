"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZipCodes = void 0;
let data;
async function getZipCodes() {
    if (!data) {
        data = require('../src/data.json');
    }
    return data;
}
exports.getZipCodes = getZipCodes;
//# sourceMappingURL=loader.js.map