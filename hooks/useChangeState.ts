import {useState} from "react";
import type {ChangeEvent, Dispatch, SetStateAction} from "react"

export function useChangeDictState<S extends {}>(
		initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, (e: ChangeEvent<HTMLInputElement>) => void] {
	const [state, setState] = useState<S>(initialState)

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	return [state, setState, onChange] as const
}

export function useChangeListState<T, List extends T[] = T[]>():
		[
			List,
			Dispatch<SetStateAction<List>>,
			(e: ChangeEvent<HTMLInputElement>) => void
		] {
	const [state, setState] = useState([] as unknown as List);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setState((prevState) => [...prevState, e.target.name as T] as List);
		} else {
			setState((prevState) => prevState.filter((item) => item !== e.target.name) as List);
		}
	};

	return [state, setState, onChange];
}