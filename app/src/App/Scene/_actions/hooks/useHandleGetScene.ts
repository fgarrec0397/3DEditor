import { deserialize } from "@app/Core/_actions/utilities/componentSerializer";
import { useWidgetsActions, useWidgetsModules } from "@app/Widgets/_actions/hooks";
import { buildWidgetsDictionary } from "@app/Widgets/_actions/utilities/buildWidgetDictionaryItem";
import { WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
import { useEffect } from "react";

import { fetchScene } from "../_data/services";
import { SceneApiResponseResult } from "../sceneTypes";

export default () => {
    const { widgetsModules, getSceneWidgetComponentFromModules, getWidgetModuleFromWidgetScene } =
        useWidgetsModules();
    const { addWidgetsBatch } = useWidgetsActions();

    useEffect(() => {
        const handleFetchScene = async () => {
            await fetchScene((data: SceneApiResponseResult) => {
                const deserializedWidgets = data.serializedWidgets.map((x) => {
                    const component = getSceneWidgetComponentFromModules(x);
                    const widgetModule = getWidgetModuleFromWidgetScene(x);
                    const widgetModuleOptions = [
                        ...(widgetModule?.widgetDefinition?.options || []),
                    ];
                    const sceneWidgetOptions = [...(x?.widgetDefinition?.options || [])];

                    // Replace saved widget definitions options with local widget definitions options
                    if (sceneWidgetOptions.length && widgetModuleOptions.length) {
                        x.widgetDefinition.options = widgetModuleOptions;
                    }

                    // Unserialize meshHolder component
                    if (x.editorOptions?.meshHolder) {
                        x.editorOptions.meshHolder = deserialize(
                            x.editorOptions.meshHolder as string
                        );
                    }

                    return {
                        ...x,
                        component,
                    } as WidgetSceneObject;
                });

                const mergedWidgetDictionary = buildWidgetsDictionary(deserializedWidgets);

                // Merge saved widget dictionary based on current widgets definitions options
                Object.keys(mergedWidgetDictionary).forEach((dictionaryItemKey) => {
                    const dictionaryItem = mergedWidgetDictionary[dictionaryItemKey];

                    for (const key in data.widgetsDictionary[dictionaryItemKey].options) {
                        if (!Object.prototype.hasOwnProperty.call(dictionaryItem.options, key)) {
                            // Remove unexisting options on the local widget definitions options
                            delete data.widgetsDictionary[dictionaryItemKey].options[key];
                        }
                    }

                    // Make sure to keep the options left from the saved widget dictionary
                    mergedWidgetDictionary[dictionaryItemKey].options =
                        data.widgetsDictionary[dictionaryItemKey].options;

                    // Make sure to keep the properties left from the saved widget dictionary
                    mergedWidgetDictionary[dictionaryItemKey].properties =
                        data.widgetsDictionary[dictionaryItemKey].properties;
                });

                addWidgetsBatch(mergedWidgetDictionary, deserializedWidgets);
            });
        };

        handleFetchScene();
    }, [
        addWidgetsBatch,
        widgetsModules,
        getSceneWidgetComponentFromModules,
        getWidgetModuleFromWidgetScene,
    ]);
};
