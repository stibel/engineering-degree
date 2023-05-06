import {useReadLocalStorageOnce} from "../../../utils/hooks/useReadLocalStorageOnce";
import {useUpdateEffect} from "react-use";
import {useLocalStore} from "../../../mst/providers/app_store_provider";

export const useLoadLocalValues = () => {
    const localStore = useLocalStore();

    const [type] = useReadLocalStorageOnce('app-type');

    useUpdateEffect(() => {
        if (type) {
            localStore.setAppType(type as any);
        }
    }, [type]);
};
