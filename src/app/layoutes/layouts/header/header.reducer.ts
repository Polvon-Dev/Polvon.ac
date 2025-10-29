import { createReducer, on } from '@ngrx/store';
import { toggleSidebar } from './header.actions';

export const isSidebarOpen = false;

export const headerReducer = createReducer(
  isSidebarOpen,
  on(toggleSidebar, (state) => !state)
);
