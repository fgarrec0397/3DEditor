import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setCurrentMode } from "../editorReducer";
import { ModesAvailable } from "../types";

export default () => {
    const dispatch = useAppDispatch();
    const { currentMode } = useAppSelector((state) => state.editor);

    return {
        currentMode,
        setCurrentMode: (mode: ModesAvailable) => dispatch(setCurrentMode(mode)),
    };
};
