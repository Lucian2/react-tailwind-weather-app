import axios from '../../api/axios';
import urls from '../../constants/urls';
import { WeatherData } from '../weather-overview/api';

export interface CityInfo {
  id: number;
  name: string;
}

export const getCities = async (signal: AbortSignal): Promise<CityInfo[]> => {
  let data;
  try {
    const response = await axios.get(`${urls.WEATHERS}`, { signal });
    data = response.data.map((el: WeatherData) => {
      return {
        id: el.id,
        name: el.city,
      };
    });
  } catch (error) {
    console.log(error);
    data = null;
  }
  return data;
};
