export const handleFormSubmit = async <ReturnType>(
    promise: Promise<ReturnType>,
    callbacks?: { onSuccess?: (res: ReturnType) => unknown; onError?: (err: unknown) => unknown }
) => {
    try {
        const res = await promise;
        callbacks?.onSuccess && callbacks.onSuccess(res);
        return res;
    } catch (e) {
        console.error(e);
        callbacks?.onError && callbacks.onError(e);
    }
};
