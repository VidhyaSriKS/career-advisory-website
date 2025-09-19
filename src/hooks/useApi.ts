import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { ApiResponse } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall();
      
      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
        onSuccess?.(response.data);
      } else {
        const errorMessage = response.error || response.message || 'An error occurred';
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        onError?.(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Network error';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      onError?.(errorMessage);
    }
  }, [apiCall, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specialized hooks for common operations
export function useAsyncOperation<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (operation: () => Promise<ApiResponse<T>>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await operation();
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
        });
        return response.data;
      } else {
        const errorMessage = response.error || response.message || 'An error occurred';
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Network error';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
