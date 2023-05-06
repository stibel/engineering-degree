import {useUserStore} from "../../mst/providers/domain_store_provider";
import {IChildrenProps} from "../shared_types/Children";
import {Loading} from "../../components/Loader";
import {Unauthorized} from "../../components/Unauthorized";

//FIXME(Mikołaj): maybe make this a HOC
export const AuthGuard = ({ children }: IChildrenProps) => {
    const userStore = useUserStore();

    if (userStore.isLoading) {
        return <Loading />;
    }

    if (!userStore.user) {
        return <Unauthorized />;
    }

    return <>{children}</>;
};
