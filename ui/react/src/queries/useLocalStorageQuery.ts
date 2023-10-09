import { useMutation, useQuery } from '@tanstack/react-query';

export const useLocalStorageQuery = (key: string) =>
  useQuery<string>(
    ['localStorage', key],
    () => localStorage.getItem(key) ?? '',
    { enabled: !!key, initialData: localStorage.getItem(key) ?? '' },
  );

export const useLocalStorageMutation = (key: string) =>
  useMutation<void, Error, string | void>(
    ['localStorage', key],
    async (value?: string | void) =>
      value ? localStorage.setItem(key, value) : localStorage.removeItem(key),
  );
