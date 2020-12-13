"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("./utils");
const loader_1 = require("./loader");
const filter_1 = require("./filter");
const validate_1 = require("./validate");
async function handler(event) {
    try {
        const options = await utils_1.getOptionsFromEvent(event);
        await validate_1.validateOptions(options);
        const zips = await loader_1.getZipCodes();
        const filteredZips = await filter_1.filterZipsFromOptions(zips, options);
        const body = {
            count: filteredZips.length,
            zips: filteredZips,
        };
        if (options.debug) {
            body.options = options;
        }
        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    }
    catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }
}
exports.handler = handler;
//# sourceMappingURL=index.js.map