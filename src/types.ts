export type Results = {
    zips: Zip[];
    count: number;
    options?: Options;
};

export type Zip = {
    zip: string;
    type: string;
    primary_city: string;
    acceptable_cities: string;
    unacceptable_cities: string;
    state: string;
    county: string;
    timezone: string;
    area_codes: string;
    latitude: string;
    longitude: string;
    country: string;
    estimated_population: string;
    distance?: number;
};

export type Options = {
    zip?: string;
    partial_zip: string;
    zip_type?: string;
    city?: string;
    partial_city?: string;
    state?: string;
    county?: string;
    country?: string;
    timezone?: string;
    area_code?: string;
    limit?: number;
    debug?: boolean;
    max_pop?: number;
    min_pop?: number;
    lat: number;
    long: number;
    max_distance: number;
};
