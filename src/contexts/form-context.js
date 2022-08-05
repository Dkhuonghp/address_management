import { createContext, useContext, useReducer } from "react";
import { initialUserObj, formReducer } from "../reducers/form-reducer";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    formData: initialUserObj,
    hideForm: true,
    formError: {
      zipcodeError: false,
      mobileError: false
    }
  });

  return (
    <FormContext.Provider
      value={{
        initialUserObj,
        formState,
        dispatchForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useForm = () => useContext(FormContext);

export { FormProvider, useForm };
