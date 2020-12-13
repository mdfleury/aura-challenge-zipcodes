import { APIGatewayProxyEvent } from 'aws-lambda';
import { Options } from './types';

async function getQueryParams(event: APIGatewayProxyEvent) {
    return event.queryStringParameters;
}

async function getPostOptions(event: APIGatewayProxyEvent) {
    if (!event.body) {
        return {};
    }
    const options = JSON.parse(event.body);
    return options;
}

export async function getOptionsFromEvent(
    event: APIGatewayProxyEvent
): Promise<Options> {
    const defaults = { limit: 20 };
    const queryParams = await getQueryParams(event);
    const postOptions = await getPostOptions(event);

    return Object.assign(defaults, queryParams, postOptions);
}
