import StyledWrapper, { StyledWrapperProps } from "@common/components/Html/StyledWrapper";
import { FC } from "react";
import { css } from "styled-components";

import useIsEditor from "./_actions/hooks/useIsEditor";
import {
    EditorItemsList,
    EditorLeftPanel,
    EditorModeSelector,
    EditorSaveButton,
    EditorWidgetsMenu,
} from "./components";

interface EditorStyles {
    topWrapper?: StyledWrapperProps;
    rightWrapper?: StyledWrapperProps;
    bottomWrapper?: StyledWrapperProps;
}

const styles: EditorStyles = {
    topWrapper: {
        css: css`
            position: absolute;
            top: 1em;
            left: 1em;
            display: flex;
            align-items: flex-start;
            user-select: none;
        `,
    },
    rightWrapper: {
        css: css`
            position: absolute;
            top: 1em;
            right: 1em;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            user-select: none;
        `,
    },
    bottomWrapper: {
        css: css`
            position: absolute;
            bottom: 1em;
            left: 1em;
            display: flex;
            align-items: flex-start;
            user-select: none;
        `,
    },
};

const Editor: FC = () => {
    const { isEditor } = useIsEditor();

    if (isEditor) {
        return (
            <>
                <StyledWrapper {...styles.topWrapper}>
                    <EditorLeftPanel />
                    <EditorModeSelector />
                </StyledWrapper>
                <StyledWrapper {...styles.rightWrapper}>
                    <EditorItemsList />
                </StyledWrapper>
                {/* <StyledWrapper {...styles.rightWrapper}>
                    <ScenePreview />
                </StyledWrapper> */}
                <StyledWrapper {...styles.bottomWrapper}>
                    <EditorWidgetsMenu />
                    <EditorSaveButton />
                </StyledWrapper>
            </>
        );
    }
    return null;
};

export default Editor;
