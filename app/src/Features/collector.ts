import cameras from "@features/Widgets/Cameras";
import geometryForms from "@features/Widgets/GeometryForms";
import { GeometryFormsProps } from "@features/Widgets/GeometryForms/GeometryForms";
import player from "@features/Widgets/Player";
import { PlayerProps } from "@features/Widgets/Player/Player";
import text from "@features/Widgets/Text";
import { TextState } from "@features/Widgets/Text/state/textReducer";
import { TextProps } from "@features/Widgets/Text/Text";
import text2 from "@features/Widgets/Text2";
import { TextState2 } from "@features/Widgets/Text2/state/textReducer";

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps & TextProps & PlayerProps;

/**
 * Add your Widgets reducers state here
 */
export interface FeaturesState {
    textState: TextState;
    textState2: TextState2;
}

/**
 * Add your Widgets reducers here.
 * They will be exported and combined to the main reducer
 */
export const preparedReducer = {
    textState: text.reducer,
    textState2: text2.reducer,
};

export default [geometryForms, text, text2, player, cameras];
