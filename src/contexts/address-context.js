import { createContext, useContext, useReducer } from "react";
import { addressReducer } from "../reducers/address-reducer";

const AddressContext = createContext();

const API = "https://62d78b1251e6e8f06f1de851.mockapi.io/address/address";

const AddressProvider = ({ children }) => {
  const [addressState, dispatchAddress] = useReducer(addressReducer, []);

  return (
    <AddressContext.Provider value={{ addressState, dispatchAddress, API }}>
      {children}
    </AddressContext.Provider>
  );
};

const useAddress = () => useContext(AddressContext);

export { AddressProvider, useAddress };
