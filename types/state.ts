type Data<T = undefined> = {data: T}
type SuccessState = { success: true };
type ErrorState = { success: false; error: string };
export type StateWithoutData = (SuccessState | ErrorState);
export type State<T = undefined> = StateWithoutData & Data<T>;

type Id = {_id: string}
export type StateId = State<Id>

export type ExtraStateId<T = {}> = StateId & {
    data: T
};