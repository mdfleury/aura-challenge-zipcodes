import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getOptionsFromEvent } from './utils';
import { getZipCodes } from './loader';
import { filterZipsFromOptions } from './filter';
import { Results } from './types';
import { validateOptions } from './validate';

export async function handler(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
    try {
        const options = await getOptionsFromEvent(event);
        validateOptions(options);
        const zips = await getZipCodes();
        const filteredZips = await filterZipsFromOptions(zips, options);

        const body: Results = {
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
    } catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }
}
