export function userReducer(state = null, action) {
   switch (action.type) {
      case "LOGIN":
         return action.payload;
      case "LOGOUT":
         localStorage.clear();
         return null;
      default:
         return state;
   }
}

export function questionReducer(state = null, action) {
   switch (action.type) {
      case "SETQUESTION":
         return action.payload;
      case "REMOVEQUESTION":
         return null;
      default:
         return state;
   }
}
