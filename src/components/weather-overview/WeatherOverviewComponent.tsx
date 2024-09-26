import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { getWeatherInfo, WeatherData } from './api';
import { formatDateTime, getWeatherImagePath } from '../../utils/utils';
import WeatherDetailCard from '../weather-detail-card/WeatherDetailCard';
import { WiHumidity } from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';
import { CitiesContext, CitiesContextType } from '../../context/CitiesContext';

const WeatherOverviewComponent: FunctionComponent = () => {
  const [weatherDetails, setWeatherDetails] = useState<WeatherData>();
  const [loading, setLoading] = useState(true);
  const { selectedCity } = useContext(CitiesContext) as CitiesContextType;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    const getData = async () => {
      setLoading(true);
      const weaterData = await getWeatherInfo(signal, selectedCity);
      isMounted && setWeatherDetails(weaterData[0]);
      setLoading(false);
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedCity]);

  return !loading ? (
    <div className='weather-overview text-white flex flex-col items-center p-5 w-full'>
      {weatherDetails ? (
        <>
          <h1 className='weather-overview__title font-bold text-3xl text-center'>
            {weatherDetails.city}, {weatherDetails.country}
          </h1>
          <p className='weather-overview__date mt-5 md:mt-3'>
            {formatDateTime(weatherDetails.country)}
          </p>
          <span className='weather-overview__temperature font-bold text-2xl mt-5'>
            {weatherDetails.temperature}°
          </span>
          <span className='weather-overview__condition my-5'>
            {weatherDetails.weather_description}
          </span>
          <img
            className='w-20 weather-overview__icon'
            src={getWeatherImagePath(weatherDetails.weather_description)}
            alt={weatherDetails.weather_description}
          ></img>
          <div className='weather-overview__details flex flex-col md:flex-row gap-5 justify-center items-center w-full mt-8'>
            <WeatherDetailCard
              icon={<FaWind className='text-2xl' />}
              title={'Wind'}
              value={`${weatherDetails.wind_speed} m/s`}
            />
            <WeatherDetailCard
              icon={<WiHumidity className='text-3xl' />}
              title={'Humidity'}
              value={`${weatherDetails.humidity}%`}
            />
          </div>
        </>
      ) : (
        <p className='text-xl'>
          No weather data available. Please try again later.
        </p>
      )}
    </div>
  ) : (
    <div role='status' className='loading flex justify-center py-8'>
      <svg
        aria-hidden='true'
        className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
    </div>
  );
};

export default WeatherOverviewComponent;
