import { useActionState } from "react";
import type { ExtraStateId } from "@/types/state";

export function useActionStateId<T = {}>(
    action: (data: ExtraStateId<T>, formData: FormData) => Promise<ExtraStateId<T>>,
    initialState: ExtraStateId<T>
) {
    return useActionState<ExtraStateId<T>, FormData>(action, initialState);
}