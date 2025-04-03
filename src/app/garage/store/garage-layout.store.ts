import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';

type LayoutState = {
  text: string,
  isLoading: boolean
}

const initialState: LayoutState = {
  text: '',
  isLoading: false,
}

export const LayoutStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
    (store) => ({
      setText(text: string) {
        patchState(store, {isLoading : true, text});
        patchState(store, {isLoading : false});
      }
    })
  ),
);
