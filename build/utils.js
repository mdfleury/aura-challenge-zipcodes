"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionsFromEvent = void 0;
async function getQueryParams(event) {
    return event.queryStringParameters;
}
async function getPostOptions(event) {
    if (!event.body) {
        return {};
    }
    const options = JSON.parse(event.body);
    return options;
}
async function getOptionsFromEvent(event) {
    const defaults = { limit: 20 };
    const queryParams = await getQueryParams(event);
    const postOptions = await getPostOptions(event);
    return Object.assign(defaults, queryParams, postOptions);
}
exports.getOptionsFromEvent = getOptionsFromEvent;
//# sourceMappingURL=utils.js.map