import express from 'express';
import bodyParser from 'body-parser';
import { getRidesByPark, getBestParkForHeight, getExtremeRides } from './controllers/ridesController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/rides', getRidesByPark);
app.get('/best-park-for-height', getBestParkForHeight);
app.get('/extreme-rides', getExtremeRides);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});