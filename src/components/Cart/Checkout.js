import React, { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostCodeIsValid = isFiveChars(enteredPostCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostCodeIsValid;

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postCode: enteredPostCodeIsValid,
    });
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postCode: enteredPostCode,
    });
  };
  return (
    <form onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <div>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        {!formInputsValidity.name && <p>Name can't be empty</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        }`}
      >
        <div>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
        </div>
        {!formInputsValidity.street && <p>Street field can't be empty</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.postCode ? "" : classes.invalid
        }`}
      >
        <div>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalCodeInputRef} />
        </div>
        {!formInputsValidity.postCode && (
          <p>Post code must have 5 characters</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.city ? "" : classes.invalid
        }`}
      >
        <div>
          <label htmlFor="city">Your City</label>
          <input type="text" id="city" ref={cityInputRef} />
        </div>
        {!formInputsValidity.city && <p>City can't be empty</p>}
      </div>
      <div className={classes.buttons}>
        <button
          className={classes.cancel}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={classes.confirm} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
