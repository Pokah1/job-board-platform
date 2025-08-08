'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Profile, ProfileFilters } from '../../types/profile';

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
}

interface ProfileState {
  myProfile: Profile | null;
  profiles: Profile[];
  availableCandidates: Profile[];
  loading: boolean;
  error: string | null;
  filters: ProfileFilters;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    currentPage: number;
  };
}

type ProfileAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MY_PROFILE'; payload: Profile | null }
  | { type: 'SET_PROFILES'; payload: { profiles: Profile[]; pagination: PaginationData } }
  | { type: 'SET_AVAILABLE_CANDIDATES'; payload: { profiles: Profile[]; pagination: PaginationData } }
  | { type: 'UPDATE_PROFILE'; payload: Profile }
  | { type: 'DELETE_PROFILE'; payload: number }
  | { type: 'SET_FILTERS'; payload: ProfileFilters }
  | { type: 'RESET_FILTERS' };

const initialState: ProfileState = {
  myProfile: null,
  profiles: [],
  availableCandidates: [],
  loading: false,
  error: null,
  filters: {},
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  },
};

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_MY_PROFILE':
      return { ...state, myProfile: action.payload };
    
    case 'SET_PROFILES':
      return {
        ...state,
        profiles: action.payload.profiles,
        pagination: {
          count: action.payload.pagination.count,
          next: action.payload.pagination.next,
          previous: action.payload.pagination.previous,
          currentPage: state.filters.page || 1,
        },
        loading: false,
      };
    
    case 'SET_AVAILABLE_CANDIDATES':
      return {
        ...state,
        availableCandidates: action.payload.profiles,
        pagination: {
          count: action.payload.pagination.count,
          next: action.payload.pagination.next,
          previous: action.payload.pagination.previous,
          currentPage: state.filters.page || 1,
        },
        loading: false,
      };
    
    // case 'UPDATE_PROFILE':
    //   return {
    //     ...state,
    //     profiles: state.profiles.map(p => p.user.id === action.payload.user.id ? action.payload : p),
    //     availableCandidates: state.availableCandidates.map(p => p.user.id === action.payload.user.id ? action.payload : p),
    //     myProfile: state.myProfile?.user.id === action.payload.user.id ? action.payload : state.myProfile,
    //   };
    
    // case 'DELETE_PROFILE':
    //   return {
    //     ...state,
    //     profiles: state.profiles.filter(p => p.user.id !== action.payload),
    //     availableCandidates: state.availableCandidates.filter(p => p.user.id !== action.payload),
    //   };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'RESET_FILTERS':
      return { ...state, filters: {} };
    
    default:
      return state;
  }
}

interface ProfileContextType {
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
