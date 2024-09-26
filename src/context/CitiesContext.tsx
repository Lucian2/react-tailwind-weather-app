import { createContext, useState, FunctionComponent, ReactNode } from 'react';

export interface CitiesContextType {
  selectedCity: string;
  setSelectedCity: (value: string) => void;
}

export const CitiesContext = createContext<CitiesContextType | undefined>(
  undefined
);

export const CitiesProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  return (
    <CitiesContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CitiesContext.Provider>
  );
};
