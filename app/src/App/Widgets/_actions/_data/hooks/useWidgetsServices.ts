import { useCallback } from "react";

import { useWidgets } from "../../hooks";
import {
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
    WidgetsDictionaryItem,
} from "../../widgetsTypes";
import useSceneWidgetsContext from "./useSceneWidgetsContext";
import useWidgetDispatch from "./useWidgetDispatch";

export default () => {
    const { widgets, setSceneWidgets } = useSceneWidgetsContext();
    const { widgetsDictionary } = useWidgets();
    const {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveSelected,
        dispatchSetCurrentWidgetProperties,
        dispatchRemoveWidgetDictionary,
    } = useWidgetDispatch();

    const add = useCallback(
        (newWidget: WidgetSceneObject, newWidgetsDictionaryItem: WidgetsDictionaryItem) => {
            if (newWidget.id) {
                const requiredWidgetDictionaryItem =
                    newWidgetsDictionaryItem as Required<WidgetsDictionaryItem>;
                dispatchAddDictionary(requiredWidgetDictionaryItem);
            }

            setSceneWidgets((prevWidgets) => [...prevWidgets, newWidget]);
        },
        [dispatchAddDictionary, setSceneWidgets]
    );

    const addBatch = useCallback(
        (newWidgets: WidgetSceneObject[], newWidgetsDictionary: WidgetsDictionary) => {
            dispatchAddBatchDictionary(newWidgetsDictionary);
            setSceneWidgets((prevWidgets) => [...prevWidgets, ...newWidgets]);
        },
        [dispatchAddBatchDictionary, setSceneWidgets]
    );

    const update = useCallback(
        (
            widget: WidgetSceneObject,
            widgetProperties?: WidgetProperties,
            widgetOptions?: WidgetOptionsValues
        ) => {
            if (widget.id) {
                console.log({
                    id: widget.id,
                    options: widgetOptions,
                    properties: widgetProperties,
                });

                console.log(widgetsDictionary, "widgetsDictionary");

                dispatchUpdateDictionary({
                    id: widget.id,
                    options: widgetOptions,
                    properties: widgetProperties,
                });
            }
        },
        [dispatchUpdateDictionary, widgetsDictionary]
    );

    const remove = (widget: WidgetSceneObject) => {
        const updatedWidgets = widgets.filter(({ id }) => id !== widget.id);
        setSceneWidgets([...updatedWidgets]);
        dispatchRemoveWidgetDictionary(widget.id);
        dispatchRemoveSelected();
    };

    const updateCurrentProperties = (widgetProperties: WidgetProperties) => {
        dispatchSetCurrentWidgetProperties(widgetProperties);
    };

    return {
        add,
        addBatch,
        update,
        remove,
        updateCurrentProperties,
    };
};
