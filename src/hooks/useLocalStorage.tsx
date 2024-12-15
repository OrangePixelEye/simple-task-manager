import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
      // Retrieve initial value from localStorage or use the provided default
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        return initialValue;
    }
  });

  // Define a setter function to update both state and localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Handle functional updates (similar to React state setter)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update the state
      setStoredValue(valueToStore);

      // Update localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
    return [storedValue, setValue] as const
}

export default useLocalStorage