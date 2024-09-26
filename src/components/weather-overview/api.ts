import axios from '../../api/axios';
import urls from '../../constants/urls';

export interface WeatherData {
  id: number;
  city: string;
  country: string;
  temperature: string;
  weather_description: string;
  humidity: number;
  wind_speed: number;
}

export const getWeatherInfo = async (
  signal: AbortSignal,
  search?: string
): Promise<WeatherData[]> => {
  let data;
  try {
    const response = await axios.get(
      `${urls.WEATHERS}?search=${search || 'London'}`,
      { signal }
    );
    data = response.data;
  } catch (error) {
    console.log(error);
    data = null;
  }
  return data;
};
