import { AnyAction } from 'redux';


export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

//action type without payload to resolve error with payload to be undefined
export type Action<T> = {
  type: T;
};

//overloading function to define type
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

//define implementation
export function createAction <T extends string, P>(type: T, payload: P) {
  return { type, payload };
};

// export const createAction = (type, payload) => ({ type, payload });