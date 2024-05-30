import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { getRidesByPark, getBestParkForHeight, getExtremeRides } from '../src/controllers/ridesController';
import { RollerCoaster, fetchData } from '../src/utils/dataFetcher';

jest.mock('../src/utils/dataFetcher');

const mockData: RollerCoaster[] = [
    {
        coaster_name: 'Switchback Railway',
        location: 'Coney Island',
        status: 'operating',
        height_restriction: '122 cm',
        speed_mph: 6,
        height_value: 50
    },
    {
        coaster_name: 'Thunderbolt',
        location: 'Luna Park',
        status: 'operating',
        height_restriction: '50 in (127 cm)',
        speed_mph: 55,
        height_value: 115
    },
    {
        coaster_name: 'Another Ride',
        location: 'Wonderland',
        status: 'operating',
        height_restriction: '54–77 in (137–196 cm)',
        speed_mph: 50,
        height_value: 120
    }
];

(fetchData as jest.Mock).mockResolvedValue(mockData);

const app = express();
app.use(bodyParser.json());
app.get('/rides', getRidesByPark);
app.get('/best-park-for-height', getBestParkForHeight);
app.get('/extreme-rides', getExtremeRides);

describe('Rides Routes', () => {
    it('should get rides by park name', async () => {
        const response = await request(app).get('/rides').query({ park: 'Coney Island' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            openRides: [mockData[0]],
            closedRides: [],
            removedRides: []
        });
    });

    it('should get the best park for a given height', async () => {
        const response = await request(app).get('/best-park-for-height').query({ height: '150' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ park: 'Wonderland', count: 1 });
    });

    it('should get all the fastest rides', async () => {
        const response = await request(app).get('/extreme-rides').query({ type: 'fastest', threshold: '50' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            mockData[1],
            mockData[2],
            mockData[3]
        ]);
    });

    it('should get all the highest rides', async () => {
        const response = await request(app).get('/extreme-rides').query({ type: 'highest', threshold: '110' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            mockData[1],
            mockData[2],
            mockData[4]
        ]);
    });

    it('should return 400 if park name is not provided for /rides', async () => {
        const response = await request(app).get('/rides');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing park query parameter');
    });

    it('should return 400 if height is not a valid number for /best-park-for-height', async () => {
        const response = await request(app).get('/best-park-for-height').query({ height: 'invalid' });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing height query parameter or valid height is required');
    });

    it('should return 400 if type is not valid for /extreme-rides', async () => {
        const response = await request(app).get('/extreme-rides').query({ type: 'invalid', threshold: '10' });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing type query parameter or valid type is required (fastest or highest)');
    });

    it('should return 400 if threshold is not a valid number for /extreme-rides', async () => {
        const response = await request(app).get('/extreme-rides').query({ type: 'fastest', threshold: 'invalid' });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing threshold query parameter or valid threshold is required');
    });
});