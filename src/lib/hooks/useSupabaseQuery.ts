import { useState, useCallback } from 'react';
import { supabase } from '../supabase';
import { useRetryWithBackoff } from './useRetryWithBackoff';

interface UseSupabaseQueryOptions {
  retryCount?: number;
  onError?: (error: Error) => void;
}

export function useSupabaseQuery<T>(options: UseSupabaseQueryOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { retry } = useRetryWithBackoff();

  const execute = useCallback(async <R>(
    queryFn: () => Promise<{ data: R | null; error: Error | null; }>
  ): Promise<R | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await retry(async () => {
        const { data, error } = await queryFn();
        if (error) throw error;
        return data;
      }, {
        maxAttempts: options.retryCount || 3,
        onError: options.onError
      });

      return result;
    } catch (err) {
      const error = err as Error;
      console.error('Query error:', error);
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [retry, options]);

  return { execute, isLoading, error };
}