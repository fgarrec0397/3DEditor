import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setIsEditing } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { isEditing } = useAppSelector((state) => state.editor);

    return {
        isEditing,
        setIsEditing: (value: boolean) => dispatch(setIsEditing(value)),
    };
};
