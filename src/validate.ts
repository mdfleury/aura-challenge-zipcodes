import { Options } from './types';

export function validateOptions(options: Options) {
    if ((options.lat && !options.long) || (options.long && !options.lat)) {
        throw new Error('Bad options');
    }
}
