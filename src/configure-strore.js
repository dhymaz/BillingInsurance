import { createStore } from 'redux';
import { reducer } from './counter/reducer';

export const store = createStore(reducer);