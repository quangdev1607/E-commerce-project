import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiCreateOrder } from "../../api";

// This value is from the props in the UI
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payload, setIsSucceed }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  const navigate = useNavigate();
  const handleSaveOrder = async (payload) => {
    const response = await apiCreateOrder({ ...payload, status: "Succeed" });
    if (response.success) {
      setIsSucceed(true);
      setTimeout(() => {
        Swal.fire("Congratulation", "Your purchase is completed", "success").then(() => {
          navigate("/");
        });
      }, 500);
    }
  };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [{ amount: { currency_code: currency, value: amount } }],
            })
            .then((orderID) => orderID)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            console.log(response);
            console.log(payload);
            if (response.status === "COMPLETED") {
              handleSaveOrder(payload);
            }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount, payload, setIsSucceed }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px", margin: "auto" }}>
      <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
        <ButtonWrapper
          setIsSucceed={setIsSucceed}
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
