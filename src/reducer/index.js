const initialState = {
  SavedLocations: {
    content: [],
    favloc: [],
  },
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_MAIN":
      return {
        ...state,
        SavedLocations: {
          ...state.SavedLocations,
          content: [/*...state.SavedLocations.content,*/ action.payload],
        },
      };
    case "ADD_TO_FAV":
      return {
        ...state,
        SavedLocations: {
          ...state.SavedLocations,
          favloc: [...state.SavedLocations.favloc, action.payload],
        },
      };
    default:
      return state;
  }
};
export default Reducer;
