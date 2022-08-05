const addressReducer = (state, { type, payload }) => {
  switch (type) {
    case "SHOW_ADDRESS":
      return [...state, ...payload.data];
    case "ADD_ADDRESS":
      return [...state, payload.data];
    case "EDIT_ADDRESS":
      return [...state].map((data) =>
        data.id === payload.data.id ? payload.data : data
      );
    case "DELETE_ADDRESS":
      return [...state].filter((data) => data.id !== payload.data.id);
    default:
      return state;
  }
};

export { addressReducer };
