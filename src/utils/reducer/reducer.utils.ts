import { AnyAction } from 'redux';

//extend action creators to perform type check to respond approprietly to the actions
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

//overload function with types of creators that will be received
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

//funvtion to receive any number of arguments in array
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

//actual function withMatcher
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  //mappable object
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
};

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