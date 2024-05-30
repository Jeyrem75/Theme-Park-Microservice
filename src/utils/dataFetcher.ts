import axios from 'axios';

const DATA_URL = 'https://gist.githubusercontent.com/Jurollet/12470631232f30a81ace67add5bf839a/raw/3c514d9618b98e58a870bb2f0f01fbe3221e03f5/rides.json';

export interface RollerCoaster {
    coaster_name: string;
    location: string;
    status: string;
    speed_mph: number;
    height_value: number;
    height_restriction: string;
}

interface ApiResponse {
    rides: RollerCoaster[];
}

export const fetchData = async (): Promise<RollerCoaster[]> => {
    try {
        const response = await axios.get<ApiResponse>(DATA_URL);
        if (response.data && Array.isArray(response.data.rides)) {
            return response.data.rides;
        } else {
            throw new Error('Invalid data format received from the API');
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};