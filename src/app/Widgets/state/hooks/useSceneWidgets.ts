import { useThree } from "@react-three/fiber";
import { useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { WidgetSceneObject } from "../../types";
import { WidgetsContext } from "../WidgetsProvider";
import { removeSelected } from "../widgetsReducer";
import useWidgetsUtilities from "./useWidgetsUtilities";

export default () => {
    const { scene } = useThree();
    const [meshToRemove, setMeshToRemove] = useState<Object3D | null>(null);
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.widgets);
    const { getMeshByWidget, getWidgetByMesh } = useWidgetsUtilities();
    const { widgets, setWidgets } = useContext(WidgetsContext);
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        console.log(scene.children.length, "scene.children.length");
    }, [scene.children.length]);

    useEffect(() => {
        console.log(meshToRemove, "meshToRemove");

        if (meshToRemove) {
            const { widget } = getWidgetByMesh(meshToRemove);
            console.log(widget, "widget to remove");

            if (widget) {
                const updatedWidgets = widgets.filter(({ id }) => id !== widget.id);
                console.log(updatedWidgets, "updatedWidgets");

                setWidgets([...updatedWidgets]);
                setMeshToRemove(null);
            }
        }
    }, [meshToRemove]);

    useEffect(() => {
        const currentWidgets = widgets.filter((x) => {
            if (x.id) {
                return selected.indexOf(x.id) !== -1;
            }

            return false;
        });

        setCurrentWidgetsState(currentWidgets);
    }, [selected]);

    // Force rerender when widgets is updated. Should at least be for the first widget renderer
    const [, setWidgetsState] = useState<any>([]);
    useEffect(() => {
        setWidgetsState(widgets);
    }, [widgets.length]);

    const copyWidget = (widget: WidgetSceneObject) => {};

    const removeCurrentWidgets = () => {
        const mesh = getMeshByWidget(currentWidgetsState[0]);

        if (mesh) {
            removeWidget(mesh);
        } else {
            console.error("No mesh found");
        }
    };

    const removeWidget = (mesh: Object3D) => {
        setMeshToRemove(mesh);
        // scene.remove(mesh);

        dispatch(removeSelected());
    };

    return {
        copyWidget,
        removeCurrentWidgets,
        removeWidget,
    };
};