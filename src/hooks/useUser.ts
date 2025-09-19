import { useCallback } from 'react';
import { useAsyncOperation } from './useApi';
import apiService from '../services/api';
import { User, QuizResults } from '../types';
import toast from 'react-hot-toast';

export function useUserProfile() {
  const { execute, ...state } = useAsyncOperation<User>();

  const loadProfile = useCallback(async () => {
    try {
      const data = await execute(() => apiService.getUserProfile());
      return data;
    } catch (error) {
      toast.error('Failed to load profile');
      throw error;
    }
  }, [execute]);

  const updateProfile = useCallback(async (profileData: Partial<User>) => {
    try {
      const data = await execute(() => apiService.updateUserProfile(profileData));
      toast.success('Profile updated successfully!');
      return data;
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    }
  }, [execute]);

  return {
    ...state,
    loadProfile,
    updateProfile,
  };
}

export function useQuizResults() {
  const { execute, ...state } = useAsyncOperation<QuizResults>();

  const saveQuizResults = useCallback(async (quizResults: QuizResults) => {
    try {
      await execute(() => apiService.saveQuizResults(quizResults));
      toast.success('Quiz results saved successfully!');
    } catch (error) {
      toast.error('Failed to save quiz results');
      throw error;
    }
  }, [execute]);

  // Use a separate executor for history that returns an array of results
  const historyExecutor = useAsyncOperation<QuizResults[]>();

  const loadQuizHistory = useCallback(async () => {
    try {
      const data = await historyExecutor.execute(() => apiService.getQuizHistory());
      return data;
    } catch (error) {
      toast.error('Failed to load quiz history');
      throw error;
    }
  }, [historyExecutor]);

  return {
    ...state,
    saveQuizResults,
    loadQuizHistory,
  };
}
