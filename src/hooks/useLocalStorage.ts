import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialState: T): [T, (value: T) => void] => {
  const getLocalStorage = () => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialState;
    } catch (e) {
      console.error(e);
      return initialState;
    }
  };

  const [storage, setStorage] = useState(getLocalStorage());

  const setLocalStorage = (value: T) => {
    try {
      setStorage(value);
      const parsedItem = JSON.stringify(value);
      localStorage.setItem(key, parsedItem);
    } catch (e) {
      console.error(e);
    }
  };
  return [storage, setLocalStorage];
};
