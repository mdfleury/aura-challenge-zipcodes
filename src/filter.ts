import { Zip, Options } from './types';

function distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit?: string
): number {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == 'K') {
            dist = dist * 1.609344;
        }
        if (unit == 'N') {
            dist = dist * 0.8684;
        }
        return dist;
    }
}

export async function filterZipsFromOptions(data: Zip[], options: Options) {
    // filter on zip code
    if (options.zip) {
        data = data.filter((zip: Zip) => zip.zip === options.zip);
    }
    // filter on partial zip code
    if (options.partial_zip) {
        data = data.filter((zip: Zip) => zip.zip.includes(options.partial_zip));
    }
    // filter on state
    if (options.state) {
        data = data.filter((zip: Zip) => zip.state === options.state);
    }
    // filter on max population
    if (options.max_pop) {
        data = data.filter(
            (zip: Zip) => parseInt(zip.estimated_population) < options.max_pop
        );
    }
    // filter on min population
    if (options.min_pop) {
        data = data.filter(
            (zip: Zip) => parseInt(zip.estimated_population) > options.min_pop
        );
    }
    // filter on country
    if (options.country) {
        data = data.filter((zip: Zip) => zip.country === options.country);
    }
    // filter on timezone
    if (options.timezone) {
        data = data.filter((zip: Zip) => zip.timezone === options.timezone);
    }
    // filter on county
    if (options.county) {
        data = data.filter((zip: Zip) => zip.county === options.county);
    }
    // filter on city
    if (options.city) {
        data = data.filter((zip: Zip) => zip.primary_city === options.city);
    }
    // filter on partial city
    if (options.partial_city) {
        data = data.filter((zip: Zip) =>
            zip.primary_city.includes(options.partial_city)
        );
    }
    // filter on zip type
    if (options.zip_type) {
        data = data.filter((zip: Zip) => zip.type === options.zip_type);
    }
    // filter on area codes
    if (options.area_code) {
        data = data.filter((zip: Zip) =>
            zip.area_codes.includes(options.area_code)
        );
    }
    // filter on distance
    if (options.lat && options.long) {
        data.forEach(zip => {
            zip.distance = distance(
                options.lat,
                options.long,
                parseFloat(zip.latitude),
                parseFloat(zip.longitude)
            );
        });
        if (options.max_distance) {
            data = data.filter(
                (zip: Zip) => zip.distance < options.max_distance
            );
        }
    }

    return data.slice(0, options.limit);
}
