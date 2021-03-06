import { store } from "@core/store";
import CamerasContextProvider from "@scene/_actions/_data/providers/CamerasContextProvider";
import SceneWidgetsContextProvider from "@widgets/_actions/_data/providers/SceneWidgetsProvider";
import WidgetsModulesContextProvider from "@widgets/_actions/_data/providers/WidgetsModulesProvider";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

const AppProviders: FC = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <CamerasContextProvider>
                <SceneWidgetsContextProvider>
                    <WidgetsModulesContextProvider>{children}</WidgetsModulesContextProvider>
                </SceneWidgetsContextProvider>
            </CamerasContextProvider>
        </ReduxProvider>
    );
};

export default AppProviders;
