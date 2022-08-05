const initialUserObj = {
  name: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  mobile: ""
};

const formReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_INPUT":
      return {
        ...state,
        formData: { ...state.formData, [payload.name]: payload.value }
      };
    case "EDIT_INPUT":
      return { ...state, formData: payload.data };
    case "CLEAR_INPUT":
      return { ...state, formData: initialUserObj };
    case "OPEN_FORM":
      return { ...state, hideForm: false };
    case "CLOSE_FORM":
      return { ...state, hideForm: true };
    case "ZIPCODE_ERROR":
      return {
        ...state,
        formError: { ...state.formError, zipcodeError: payload.zipcodeError }
      };
    case "MOBILE_ERROR":
      return {
        ...state,
        formError: { ...state.formError, mobileError: payload.mobileError }
      };
    default:
      return state;
  }
};

export { initialUserObj, formReducer };
