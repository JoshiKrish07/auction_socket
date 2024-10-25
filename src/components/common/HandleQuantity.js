"use client";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

// Reducer function to manage quantity state
function quantityReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { quantity: state.quantity + action.increment };
    case "DECREMENT":
      return {
        quantity:
          state.quantity > action.increment
            ? state.quantity - action.increment
            : state.quantity,
      };
    case "SET":
      return { quantity: action.payload >= 1 ? action.payload : 1 };
    default:
      return state;
  }
}

const HandleQuantity = ({
  lotMinIncrement,
  initialQuantity,
  currentQuantity,
  onPlaceBid,
}) => {
  const [quantityState, dispatchQuantityReducer] = useReducer(quantityReducer, {
    quantity: initialQuantity,
  });
  // console.log("====quantityState.quantity====>", quantityState.quantity);
  // console.log("====initialQuantity====>", initialQuantity);
  const increment = () => {
    dispatchQuantityReducer({ type: "INCREMENT", increment: lotMinIncrement });
  };

  const decrement = () => {
    dispatchQuantityReducer({ type: "DECREMENT", increment: lotMinIncrement });
    if(quantityState.quantity - lotMinIncrement <= currentQuantity) {
      dispatchQuantityReducer({ type: "SET", payload: currentQuantity });
      toast.warning("You have reached the minimum bid limit", { position: "top-right" });
    }
  };

  const handleQuantityInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      dispatchQuantityReducer({ type: "SET", payload: newValue });
    }
  };

  useEffect(() => {
    dispatchQuantityReducer({ type: "SET", payload: initialQuantity });
  }, [initialQuantity]);

  const handlePlaceBid = () => {
    onPlaceBid(quantityState.quantity);
  };
  // console.log("quantityState.quantity", quantityState.quantity);
  return (
    <div className="quantity-counter">
      <a
        className={`quantity__minus`}
        style={{
          cursor:
            quantityState.quantity <= currentQuantity
              ? "not-allowed"
              : "pointer",
          pointerEvents:
            quantityState.quantity <= currentQuantity ? "none" : "auto",
        }}
        onClick={quantityState.quantity > currentQuantity ? decrement : null}
      >
        <i className="bx bx-minus" />
      </a>

      <input
        name="quantity"
        type="number"
        value={quantityState.quantity}
        onChange={handleQuantityInputChange}
        className="quantity__input"
        min="1"
        // readOnly
        disabled
      />
      <a
        className="quantity__plus"
        style={{ cursor: "pointer" }}
        onClick={increment}
      >
        <i className="bx bx-plus" />
      </a>

      <button
        className="primary-btn btn-hover"
        onClick={handlePlaceBid}
        style={{ display: "flex", justifyContent: "center" }}
      >
        Place Bid
        <span style={{ top: "40.5px", left: "84.2344px" }} />
      </button>
    </div>
  );
};

export default HandleQuantity;
