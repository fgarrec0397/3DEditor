import { KeyboardKeys } from "../coreTypes";

export default {
    editor: [
        {
            name: "toggleEditor",
            code: "KeyE",
            ctrlKey: true,
            shiftKey: true,
        },
        {
            name: "copyWidget",
            code: "KeyC",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "pasteWidget",
            code: "KeyV",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "deleteWidget",
            code: "Delete",
            ctrlKey: false,
            shiftKey: false,
        },
        {
            name: "nextCamera",
            code: "ArrowRight",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "prevCamera",
            code: "ArrowLeft",
            ctrlKey: true,
            shiftKey: false,
        },
    ],
} as KeyboardKeys;
