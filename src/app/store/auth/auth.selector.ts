import { state } from "@angular/animations";
import { AuthState, authFeatureKey } from "./auth.reducer";
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);


export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);


export const selectIsAdmin = createSelector(selectAuthState, (state) => state.authUser?.role === 'ADMINISTRADOR')