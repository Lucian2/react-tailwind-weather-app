import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { CitiesContext, CitiesContextType } from '../../context/CitiesContext';
import { CityInfo, getCities } from './api';

const SearchComponent: FunctionComponent = () => {
  const { setSelectedCity } = useContext(CitiesContext) as CitiesContextType;
  const [inputValue, setInputValue] = useState('');
  const [cities, setCities] = useState<CityInfo[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityInfo[]>([]);

  const handleSelectCity = (city: CityInfo) => {
    setSelectedCity(city.name);
    setInputValue('');
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    const getAllCities = async () => {
      const data = await getCities(signal);
      isMounted && setCities(data);
    };

    getAllCities();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setFilteredCities(
      cities.filter((city) =>
        city.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      )
    );
  }, [inputValue]);

  return (
    <div className='search-ctn py-8 relative'>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type='search'
        name='search'
        id='search'
        autoComplete='off'
        placeholder='Search for a city...'
        className='bg-weatherCardBg text-gray-50 ps-10 pe-3 py-2 placeholder-white'
      />
      <IoSearch className='text-white text-xl absolute top-1/2 left-2 transform -translate-y-1/2' />
      <div className='search-ctn__dropdown absolute bg-white w-full'>
        <ul>
          {filteredCities?.length > 0 &&
            inputValue.length > 2 &&
            filteredCities.map((city: CityInfo) => (
              <li
                className='cursor-pointer m-2 p-1 hover:bg-gray-200'
                key={city.id}
                onClick={() => handleSelectCity(city)}
              >
                {city.name}
              </li>
            ))}
          {filteredCities?.length === 0 && inputValue.length > 2 && (
            <p className='p-3'>No city found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
