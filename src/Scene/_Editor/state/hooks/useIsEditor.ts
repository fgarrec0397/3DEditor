import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setIsEditor } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { isEditor } = useAppSelector((state) => state.editor);

    return { isEditor, setIsEditor: () => dispatch(setIsEditor()) };
    // eslint-disable-next-line prettier/prettier
};
