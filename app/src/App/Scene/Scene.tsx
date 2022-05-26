import * as THREE from "three";
import { FC, useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { Select } from "@react-three/drei";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Widgets/Widgets";
import useKeyboardControls from "../Core/hooks/useKeyboardControls";
import useWidgetsActions from "../Widgets/state/hooks/useWidgetsActions";
import { off, on } from "../Core/utils/events";
import { useThree } from "@react-three/fiber";
import { WidgetSceneObject } from "../Widgets/types";
import useWidgetsContext from "../Widgets/state/hooks/core/useWidgetsModuleContext";
import useWidgetsSelector from "../Widgets/state/hooks/core/useWidgetsSelector";
import { SetOptionalPropertyFrom } from "../Common/utils/typings";
import useGetWidgets from "../Widgets/state/hooks/useGetWidgets";
import useWidgets from "../Widgets/state/hooks/useWidgets";

const Scene: FC = () => {
    const { scene } = useThree();
    const { addWidget, selectWidget, removeSelected } = useWidgetsActions();
    const { getWidgetByMesh } = useGetWidgets();
    const { widgets } = useWidgets();
    const widgetContext = useWidgetsContext();
    const { widgetsDictionary } = useWidgetsSelector();

    useKeyboardControls();

    useEffect(() => {
        const fetchScene = async () => {
            const response = await fetch("api/scene");
            const { sceneJsonString } = await response.json();

            try {
                const widgetsDefinitionObj = JSON.parse(sceneJsonString);
                // const preparedWidgets = widgetsDefinitionObj.preparedWidgets.
                // console.log(widgetsDefinitionObj, "widgetsDefinitionObj");
            } catch (error) {
                console.error(error, "error");
            }
        };

        const handleSaveFile = async () => {
            const clonedWidgets: SetOptionalPropertyFrom<WidgetSceneObject, "component">[] = [
                ...widgets,
            ];
            const preparedWidgets = clonedWidgets.map((x) => {
                delete x.component;
                return x;
            });
            console.log(preparedWidgets, "preparedWidgets");
            console.log(widgetsDictionary, "widgetsDictionary");

            const widgetsDefinition = { preparedWidgets, widgetsDictionary };

            const rawResponse = await fetch("api/scene", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(widgetsDefinition),
            });

            const content = await rawResponse.json();

            console.log(content, "content");
        };

        fetchScene();
        console.log("after fetch");

        on("saveFile:click", handleSaveFile);

        return () => {
            off("saveFile:click", handleSaveFile);
        };
    }, [scene, widgets, widgetContext, widgetsDictionary]);

    useEffect(() => {
        const handleAddWidget = ({ detail }: any) => {
            console.log(detail, "detail");
            addWidget(detail);
        };

        const handleRemoveSelected = () => {
            removeSelected();
        };

        on("onClick:addWidget", handleAddWidget);
        on("onPointerMissed:removeSelected", handleRemoveSelected);

        return () => {
            off("onPointerMissed:removeSelected", handleRemoveSelected);
        };
    }, [addWidget, removeSelected]);

    const onSelectMesh = (meshArray: THREE.Object3D[]) => {
        if (meshArray.length) {
            const { widget } = getWidgetByMesh(meshArray[0]);
            console.log(widget, "widget");

            if (widget) {
                selectWidget(widget);
            }
        }
    };

    return (
        <Physics>
            <Lights />
            <CameraControls />
            <Select box multiple onChange={onSelectMesh} filter={(items) => items}>
                <Widgets />
            </Select>
        </Physics>
    );
};

export default Scene;
