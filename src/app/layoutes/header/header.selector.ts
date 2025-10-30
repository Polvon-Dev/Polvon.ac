import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectHeader = createFeatureSelector<boolean>('header');
export const selectIsSidebarOpen = createSelector(selectHeader, (state) => state);
