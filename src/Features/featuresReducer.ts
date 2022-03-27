import { combineReducers } from "@reduxjs/toolkit";
import { MapPropertiesToNonNullable } from "../App/Common/utils/typings";
import { FeaturesState, preparedReducer } from "./collector";

type PreparedReducer = MapPropertiesToNonNullable<typeof preparedReducer>;

export default combineReducers<FeaturesState>(preparedReducer as PreparedReducer);