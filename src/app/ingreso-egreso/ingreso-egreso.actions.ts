import { createAction, props } from '@ngrx/store';

export const setItems = createAction(
            '[Ingreso Egreso] setItems',
            props<{ items: any }>()
      );
export const unSetItems = createAction('[Ingreso Egreso] UnSet Items');