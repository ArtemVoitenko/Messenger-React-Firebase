const initialUserState = {
  currentUser: null,
  isLoading: true
};
const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    default:
      return state;
  }
};
export default user_reducer;
