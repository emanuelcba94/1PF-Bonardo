import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from 'src/app/core/models';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        // Establecer usuario autenticado
        'setAuthUser': props<{payload: User | null}>()
    }
})