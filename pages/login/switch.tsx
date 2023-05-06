import {AuthGuard} from "../../utils/guards/AuthGuard";
import {SwitchModule} from "../../components/Switch";

export const SwitchPage = () => (
    <AuthGuard>
        <SwitchModule />
    </AuthGuard>
);

export default SwitchPage;
