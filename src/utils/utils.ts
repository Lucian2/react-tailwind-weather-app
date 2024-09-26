import { countryToTimezoneMap } from '../constants/countryContinentMap';

export const formatDateTime = (country: string) => {
  const timezone = countryToTimezoneMap[country] || 'UTC';
  const now = new Date();

  const options = {
    weekday: 'long' as 'long',
    year: 'numeric' as 'numeric',
    month: 'long' as 'long',
    day: 'numeric' as 'numeric',
    hour: 'numeric' as 'numeric',
    minute: 'numeric' as 'numeric',
    second: 'numeric' as 'numeric',
    hour12: true,
    timeZone: timezone,
  };

  return now.toLocaleString('en-US', options);
};

export const getWeatherImagePath = (description: string) => {
  return `/src/assets/images/${description
    .toLocaleLowerCase()
    .replace(' ', '-')}.png`;
};
