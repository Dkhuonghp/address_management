import axios from "axios";
import { useForm } from "../contexts/form-context";
import { useAddress } from "../contexts/address-context";

const Form = () => {
  const { formState, dispatchForm } = useForm();
  const { addressState, dispatchAddress, API } = useAddress();

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    dispatchForm({ type: "SET_INPUT", payload: { name, value } });

    if (name === "zipcode") {
      const zipcodeError =
        value.length > 0 && !/^([1-9]{1}[0-9]{3}|[1-9]{1}[0-9]{5})$/.test(value)
          ? true
          : false;

      dispatchForm({ type: "ZIPCODE_ERROR", payload: { zipcodeError } });
    }

    if (name === "mobile") {
      const mobileError =
        value.length > 0 && !/^[1-9]{1}[0-9]{9}$/.test(value) ? true : false;
      dispatchForm({ type: "MOBILE_ERROR", payload: { mobileError } });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const changedObj = addressState.map((data) =>
      data.id === formState.formData.id ? true : false
    );

    if (changedObj.includes(true)) {
      const { data } = await axios.put(
        `${API}/${formState.formData.id}`,
        formState.formData
      );
      dispatchAddress({ type: "EDIT_ADDRESS", payload: { data } });
    } else {
      const { data } = await axios.post(API, formState.formData);
      dispatchAddress({ type: "ADD_ADDRESS", payload: { data } });
    }

    closeForm();
  };

  const closeForm = () => {
    dispatchForm({ type: "CLEAR_INPUT" });
    dispatchForm({ type: "CLOSE_FORM" });
  };

  return (
    <div className="form-wrapper">
      <h2>Enter Address: </h2>

      <form className="form-group" onSubmit={submitForm}>
        <div className="input-group input input-primary">
          <label className="input-label">Name: </label>
          <input
            type="text"
            placeholder="Type here..."
            name="name"
            value={formState.formData.name || ""}
            onChange={formInputHandler}
            required
          />
        </div>

        <div className="input-group input input-primary">
          <label className="input-label">Street: </label>
          <input
            type="text"
            placeholder="Type here..."
            name="street"
            value={formState.formData.street || ""}
            onChange={formInputHandler}
            required
          />
        </div>

        <div className="input-group input input-primary ">
          <label className="input-label">City: </label>
          <input
            type="text"
            placeholder="Type here..."
            name="city"
            value={formState.formData.city || ""}
            onChange={formInputHandler}
            required
          />
        </div>

        <div className="input-group input input-primary">
          <label className="input-label">Zipcode: </label>
          <div>
            <input
              type="text"
              placeholder="Type here..."
              name="zipcode"
              maxLength="6"
              value={formState.formData.zipcode || ""}
              onChange={formInputHandler}
              required
            />
            {formState.formError.zipcodeError ? (
              <div className="input-error-msg">Invalid Zipcode</div>
            ) : null}
          </div>
        </div>

        <div className="input-group input input-primary">
          <label className="input-label">State: </label>
          <input
            type="text"
            placeholder="Type here..."
            name="state"
            value={formState.formData.state || ""}
            onChange={formInputHandler}
            required
          />
        </div>

        <div className="input-group input input-primary">
          <label className="input-label">Country: </label>
          <input
            type="text"
            placeholder="Type here..."
            name="country"
            value={formState.formData.country || ""}
            onChange={formInputHandler}
            required
          />
        </div>

        <div className="input-group input input-primary">
          <label className="input-label">Mobile: </label>
          <div>
            <input
              type="text"
              placeholder="Type here..."
              name="mobile"
              maxLength="10"
              value={formState.formData.mobile || ""}
              onChange={formInputHandler}
              required
            />
            {formState.formError.mobileError ? (
              <div className="input-error-msg">Invalid Mobile Number</div>
            ) : null}
          </div>
        </div>

        <div className="form-action">
          {Object.values(formState.formData).every(
            (value) => value.length > 0
          ) &&
          !formState.formError.zipcodeError &&
          !formState.formError.mobileError ? (
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          ) : (
            <button
              className="btn btn-primary btn-disabled"
              type="submit"
              disabled
            >
              Add
            </button>
          )}

          <button className="btn btn-secondary" onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export { Form };
