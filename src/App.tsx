import { FunctionComponent } from 'react';
import WeatherOverviewComponent from './components/weather-overview/WeatherOverviewComponent';
import SearchComponent from './components/search/SearchComponent';
import { CitiesProvider } from './context/CitiesContext';

const App: FunctionComponent = () => {
  return (
    <div className='App bg-darkBlack min-h-screen flex flex-col items-center'>
      <CitiesProvider>
        <SearchComponent />
        <WeatherOverviewComponent />
      </CitiesProvider>
    </div>
  );
};

export default App;
