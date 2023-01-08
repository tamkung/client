import { combineReducers } from "redux";
import { questionReducer, userReducer } from "./userReducer";

const rootReducer = combineReducers({
   user: userReducer,
   question: questionReducer,
   //เพิ่ม store
});

export default rootReducer;
