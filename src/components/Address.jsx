import axios from "axios";
import { useEffect } from "react";
import { useAddress } from "../contexts/address-context";
import { useForm } from "../contexts/form-context";

const Address = () => {
  const { dispatchForm } = useForm();
  const { API, addressState, dispatchAddress } = useAddress();

  const deleteAddress = async (id) => {
    const { data } = await axios.delete(`${API}/${id}`);

    dispatchAddress({ type: "DELETE_ADDRESS", payload: { data } });
  };

  const editAddress = (data) => {
    dispatchForm({ type: "EDIT_INPUT", payload: { data } });
    dispatchForm({ type: "OPEN_FORM" });
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(API);
      dispatchAddress({ type: "SHOW_ADDRESS", payload: { data } });
    })();
  }, [API, dispatchAddress]);

  return (
    <div className="container">
      {addressState.map((address) => {
        const {
          id,
          name,
          street,
          city,
          state,
          zipcode,
          country,
          mobile
        } = address;

        return (
          <div className="card-wrapper card-w-badge" key={id}>
            <div>
              <p className="card-heading card-name">{name}</p>

              <p className="card-heading">{street}</p>
              <p className="card-heading">
                {city}, {state} - {zipcode}
              </p>
              <p className="card-heading">{country}</p>

              <p className="card-heading">Mobile: {mobile}</p>
            </div>

            <div className="card-action">
              <button
                className="btn btn-primary"
                onClick={() => editAddress(address)}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => deleteAddress(id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Address };
