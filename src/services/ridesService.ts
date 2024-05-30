import { RollerCoaster } from "../utils/dataFetcher";

export const filterRidesByPark = (rides: RollerCoaster[], parkName: string) => {
    return rides.filter(ride => ride.location.toLowerCase() === parkName.toLowerCase());
}

const getHeightRangeInCm = (heightRestriction: string): [number | null, number | null] => {
    if (!heightRestriction) return [null, null];

    const cmMatch = heightRestriction.match(/(\d+)\s*–\s*(\d+)\s*cm/i) || heightRestriction.match(/(\d+)\s*cm/i);

    let minCm = null;
    let maxCm = null;

    if (cmMatch) {
        minCm = parseInt(cmMatch[1], 10);
        maxCm = cmMatch[2] ? parseInt(cmMatch[2], 10) : minCm;
    }

    return [minCm, maxCm];
};

export const findBestParkForHeight = (rides: RollerCoaster[], height: number) => {
    const parkCounts: { [key: string]: number } = {};
    rides.filter(ride => ride.status.toLowerCase() === 'operating').forEach(ride => {
        const [minHeight, maxHeight] = getHeightRangeInCm(ride.height_restriction);

        if ((minHeight === null && maxHeight === null) || ((minHeight != null && minHeight <= height) && (maxHeight != null && height <= maxHeight))) {
            parkCounts[ride.location] = (parkCounts[ride.location] || 0) + 1;
        }
    });

    const bestPark = Object.keys(parkCounts).reduce((a, b) => parkCounts[a] > parkCounts[b] ? a : b, '');
    return { park: bestPark, count: parkCounts[bestPark] || 0 };
}

export const findExtremeRides = (rides: RollerCoaster[], type: 'fastest' | 'highest', threshold: number) => {
    const operatingRides =  rides.filter(ride => ride.status.toLowerCase() === 'operating');

    if (type === 'fastest') {
        return operatingRides.filter(ride => ride.speed_mph >= threshold);
    } else if (type === 'highest') {
        return operatingRides.filter(ride => ride.height_value >= threshold);
    }

    return [];
}