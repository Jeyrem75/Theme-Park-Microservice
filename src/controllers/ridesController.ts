import { Request, Response } from 'express';
import { fetchData, RollerCoaster } from '../utils/dataFetcher';
import { filterRidesByPark, findBestParkForHeight, findExtremeRides } from '../services/ridesService';

let rollerCoasters: RollerCoaster[] = [];

const loadRollerCoasters = async () => {
    try {
        const data = await fetchData();
        if (Array.isArray(data)) {
            rollerCoasters = data;
        } else {
            console.error('Fetched data is not an array:', data);
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};

loadRollerCoasters();

export const getRidesByPark = async (req: Request, res: Response) => {
    await loadRollerCoasters();

    const parkName = req.query.park as string;

    if (!parkName) {
        res.status(400).send('Missing park query parameter');
        return;
    }

    const rides = filterRidesByPark(rollerCoasters, parkName);

    const openRides = rides.filter(ride => ride.status.toLowerCase() === 'operating');
    const closedRides = rides.filter(ride => ride.status.toLowerCase() === 'closed');
    const removedRides = rides.filter(ride => ride.status.toLowerCase() === 'removed');

    res.json({ openRides, closedRides, removedRides });
}

export const getBestParkForHeight = async (req: Request, res: Response) => {
    await loadRollerCoasters();

    const height = parseInt(req.query.height as string);
    if (isNaN(height) || !height) {
        res.status(400).send('Missing height query parameter or valid height is required');
        return;
    }
    const result = findBestParkForHeight(rollerCoasters, height);
    res.json(result);
}

export const getExtremeRides = async (req: Request, res: Response) => {
    await loadRollerCoasters();

    const type = req.query.type as 'fastest' | 'highest';
    const threshold = parseInt(req.query.threshold as string);
    if (!type || (type !== 'fastest' && type !== 'highest') ) {
        res.status(400).send('Missing type query parameter or valid type is required (fastest or highest)');
        return;
    }
    if (isNaN(threshold) || !threshold) {
        res.status(400).send('Missing threshold query parameter or valid threshold is required');
        return;
    }
    const result = findExtremeRides(rollerCoasters, type, threshold);
    res.json(result);
}