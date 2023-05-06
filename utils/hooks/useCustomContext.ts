import { Context, useContext } from 'react';

export function useCustomContext<T>(CustomContext: Context<T>) {
    const context = useContext<T>(CustomContext);

    if (!context)
        throw new Error(
            "Can't get value from the context! Possibly proper provider were not given"
        );

    return context;
}
