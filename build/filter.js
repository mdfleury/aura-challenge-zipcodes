"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterZipsFromOptions = void 0;
function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    }
    else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) +
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
async function filterZipsFromOptions(data, options) {
    // filter on zip code
    if (options.zip) {
        data = data.filter((zip) => zip.zip === options.zip);
    }
    // filter on partial zip code
    if (options.partial_zip) {
        data = data.filter((zip) => zip.zip.includes(options.partial_zip));
    }
    // filter on state
    if (options.state) {
        data = data.filter((zip) => zip.state === options.state);
    }
    // filter on max population
    if (options.maxPop) {
        data = data.filter((zip) => parseInt(zip.estimated_population) < options.maxPop);
    }
    // filter on min population
    if (options.minPop) {
        data = data.filter((zip) => parseInt(zip.estimated_population) > options.minPop);
    }
    // filter on country
    if (options.country) {
        data = data.filter((zip) => zip.country === options.country);
    }
    // filter on timezone
    if (options.timezone) {
        data = data.filter((zip) => zip.timezone === options.timezone);
    }
    // filter on county
    if (options.county) {
        data = data.filter((zip) => zip.county === options.county);
    }
    // filter on city
    if (options.city) {
        data = data.filter((zip) => zip.primary_city === options.city);
    }
    // filter on partial city
    if (options.partial_city) {
        data = data.filter((zip) => zip.primary_city.includes(options.partial_city));
    }
    // filter on zip type
    if (options.zip_type) {
        data = data.filter((zip) => zip.type === options.zip_type);
    }
    // filter on area codes
    if (options.area_code) {
        data = data.filter((zip) => zip.area_codes.includes(options.area_code));
    }
    // filter on distance
    if (options.lat && options.long) {
        data.forEach(zip => {
            zip.distance = distance(options.lat, options.long, parseFloat(zip.latitude), parseFloat(zip.longitude));
        });
        if (options.max_distance) {
            data = data.filter((zip) => zip.distance < options.max_distance);
        }
    }
    return data.slice(0, options.limit);
}
exports.filterZipsFromOptions = filterZipsFromOptions;
//# sourceMappingURL=filter.js.map