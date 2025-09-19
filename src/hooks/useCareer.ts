import { useState, useCallback } from 'react';
import { useApi, useAsyncOperation } from './useApi';
import apiService from '../services/api';
import { Career, CareerRecommendation, RecommendationRequest } from '../types';
import toast from 'react-hot-toast';

export function useCareers(filters?: any) {
  return useApi(
    () => apiService.getCareers(filters),
    {
      onError: (error) => toast.error(`Failed to load careers: ${error}`),
    }
  );
}

export function useCareer(id: string) {
  return useApi(
    () => apiService.getCareerById(id),
    {
      immediate: !!id,
      onError: (error) => toast.error(`Failed to load career: ${error}`),
    }
  );
}

export function useCareerRecommendations() {
  const { execute, ...state } = useAsyncOperation<CareerRecommendation[]>();

  const getRecommendations = useCallback(async (request: RecommendationRequest) => {
    try {
      const data = await execute(() => apiService.getCareerRecommendations(request));
      toast.success('Career recommendations generated successfully!');
      return data;
    } catch (error) {
      toast.error('Failed to generate recommendations');
      throw error;
    }
  }, [execute]);

  const getQuizBasedRecommendations = useCallback(async (quizResults: any) => {
    try {
      const data = await execute(() => apiService.getQuizBasedRecommendations(quizResults));
      toast.success('Quiz-based recommendations generated!');
      return data;
    } catch (error) {
      toast.error('Failed to generate quiz-based recommendations');
      throw error;
    }
  }, [execute]);

  const getPersonalizedRecommendations = useCallback(async () => {
    try {
      const data = await execute(() => apiService.getPersonalizedRecommendations());
      toast.success('Personalized recommendations loaded!');
      return data;
    } catch (error) {
      toast.error('Failed to load personalized recommendations');
      throw error;
    }
  }, [execute]);

  return {
    ...state,
    getRecommendations,
    getQuizBasedRecommendations,
    getPersonalizedRecommendations,
  };
}

export function useSavedCareers() {
  const { execute, ...state } = useAsyncOperation<Career[]>();
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>([]);

  const loadSavedCareers = useCallback(async () => {
    try {
      const data = await execute(() => apiService.getSavedCareerPaths());
      if (data) {
        setSavedCareerIds(data.map(career => career.id));
      }
      return data;
    } catch (error) {
      toast.error('Failed to load saved careers');
      throw error;
    }
  }, [execute]);

  const saveCareer = useCallback(async (careerId: string) => {
    try {
      await apiService.saveCareerPath(careerId);
      setSavedCareerIds(prev => [...prev, careerId]);
      toast.success('Career saved to your favorites!');
    } catch (error) {
      toast.error('Failed to save career');
      throw error;
    }
  }, []);

  const removeSavedCareer = useCallback(async (careerId: string) => {
    try {
      await apiService.removeSavedCareerPath(careerId);
      setSavedCareerIds(prev => prev.filter(id => id !== careerId));
      toast.success('Career removed from favorites');
    } catch (error) {
      toast.error('Failed to remove career');
      throw error;
    }
  }, []);

  const isCareerSaved = useCallback((careerId: string) => {
    return savedCareerIds.includes(careerId);
  }, [savedCareerIds]);

  return {
    ...state,
    savedCareerIds,
    loadSavedCareers,
    saveCareer,
    removeSavedCareer,
    isCareerSaved,
  };
}
