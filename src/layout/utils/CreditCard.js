import "react-credit-cards-2/dist/es/styles-compiled.css";
import React, { useState, useEffect } from "react";
import { buyTravel } from "../../redux/actions";
import SpinnerBanc from "./spinner/SpinnerBanc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cards from "react-credit-cards-2";

const CreditCard = ({ travelId, price }) => {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleBuy = (event) => {
    event.preventDefault();

    const validate = validateCard(state);
    if (validate.status) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
        dispatch(buyTravel(travelId));
      }, 6000); // Cerrar el spinner después de 6 segundos
      setShowSpinner(true);
      return () => {
        clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes
      };
    } else {
      setError(validate.message);
    }
  };

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (e) => {
    setState({
      ...state,
      focus: e.target.name,
    });
  };

  const resetError = () => {
    setError("");
  };

  const handleReturn = () => {
    return navigate("/travels");
  };

  useEffect(() => {
    if (
      !!state.number?.length === true &&
      !!state.name?.length === true &&
      !!state.expiry?.length === true &&
      !!state.cvc?.length === true
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [state]);

  const btnClass = !buttonDisabled
    ? " btn-travel-description btn-disabled mt-1"
    : "btn-travel-description mt-1";

  return (
    <div className="App">
      {showSpinner ? (
        <SpinnerBanc />
      ) : (
        <div>
          <div className="card">
            <div className="card-body">
              <div className="product-details-travel-description">
                <Cards
                  number={state.number}
                  name={state.name}
                  expiry={state.expiry}
                  cvc={state.cvc}
                  focused={state.focus}
                />
              </div>
              <div className="product-image-travel-description">
                <form>
                  <div className="form-group">
                    <label htmlFor="number">Número de la tarjeta</label>
                    <input
                      type="number"
                      name="number"
                      id="number"
                      maxLength="16"
                      className="form-control"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      maxLength="30"
                      className="form-control"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="expiry">Fecha de expiración</label>
                      <input
                        type="text"
                        name="expiry"
                        id="expiry"
                        placeholder="MM/AA"
                        maxLength="5"
                        className="form-control"
                        onChange={handleInputChange}
                        onFocus={handleFocusChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        type="number"
                        name="cvc"
                        id="cvc"
                        maxLength="4"
                        className="form-control"
                        onChange={handleInputChange}
                        onFocus={handleFocusChange}
                      />
                    </div>
                  </div>
                </form>
                <div>
                  <p className="buy-travel-description">
                    Total: <span className="price">{price}</span>
                  </p>
                </div>
                <button
                  onClick={handleBuy}
                  className={btnClass}
                  disabled={!buttonDisabled}
                >
                  <span className="buy-travel-description  ">Finalize Buy</span>
                </button>
                {!error ? (
                  <br />
                ) : (
                  <div className="error" onClick={resetError}>
                    <p data-testid="error"> {error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button 
						className="btn btn-secondary mt-3" 
						onClick={handleReturn}
					>
            Volver
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditCard;

function validateCard(state) {
  let validate = { status: true, message: "" };
  const expirationDate = state.expiry;
  const cvc = state.cvc;
  if (validateExpirationDate(expirationDate)) {
    if (validateCVC(cvc)) {
      validate.status = true;
      validate.message = "";
    } else {
      validate.status = false;
      validate.message = "CVC invalid";
    }
  } else {
    validate.status = false;
    validate.message = "The expiration date is not valid.";
  }

  return validate;
}

function validateExpirationDate(expirationDate) {
  // The expiration date format should be "MM/YY"
  const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

  if (!dateRegex.test(expirationDate)) {
    return false; // Incorrect format
  }

  const dateParts = expirationDate.split("/");
  const month = parseInt(dateParts[0], 10);
  const year = parseInt(dateParts[1], 10);

  // Get the current year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Only the last two digits of the current year

  // Check if the expiration date is valid
  if (
    year < currentYear ||
    (year === currentYear && month < currentDate.getMonth() + 1)
  ) {
    return false; // The card is expired
  }

  return true; // The expiration date is valid
}

function validateCVC(cvc) {
  // Remove leading and trailing whitespace from CVC
  cvc = cvc.trim();

  // Check if CVC has exactly 3 or 4 digits and contains only numbers
  const regex = /^[0-9]{3,4}$/;

  if (regex.test(cvc)) {
    return true; // The CVC is valid
  } else {
    return false; // The CVC is invalid
  }
}
