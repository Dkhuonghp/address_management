import "../styles.scss";
import { Form } from "./Form";
import { Address } from "./Address";
import { useForm } from "../contexts/form-context";

export default function App() {
  const { formState, dispatchForm } = useForm();

  return (
    <div className={`App ${formState.hideForm ? null : "bg-overlay"}`}>
      <h1>Address Management</h1>

      {formState.hideForm ? (
        <button
          className="btn btn-primary add-address"
          onClick={() => dispatchForm({ type: "OPEN_FORM" })}
        >
          <i className="fa fa-plus"></i>
          Add Address
        </button>
      ) : (
        <Form />
      )}

      <Address />
    </div>
  );
}
