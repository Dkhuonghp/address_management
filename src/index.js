import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./components/AppAddress";
import { AddressProvider } from "./contexts/address-context";
import { FormProvider } from "./contexts/form-context";

import User from "./components/User/User";
import Layout from "./components/Layout";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <FormProvider>
      <AddressProvider>
        <Layout/>
      </AddressProvider>
    </FormProvider>
  </StrictMode>,
  rootElement
);

