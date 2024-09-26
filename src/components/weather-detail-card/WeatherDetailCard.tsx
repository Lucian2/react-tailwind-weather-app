import { FunctionComponent, ReactNode } from 'react';

interface WeatherDetailCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const WeatherDetailCard: FunctionComponent<WeatherDetailCardProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className='detail-card flex items-center gap-5 bg-weatherCardBg py-4 px-3 rounded-lg max-w-xs w-full'>
      <div className='detail-card__icon'>{icon}</div>
      <div className='detail-card__description'>
        <p>{title}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default WeatherDetailCard;
