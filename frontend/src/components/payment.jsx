import React, { useState, useEffect } from "react";

const ProductDisplay = () => (
   <section>
      <div className="product">
         <div className="description">
            <h3>Todo Premium</h3>
            <h5>Rs. 200.00</h5>
         </div>
      </div>
      <form action="http://127.0.0.1:5000/create-checkout-session" method="POST">
         <button type="submit">
            Checkout
         </button>
      </form>
   </section>
);

const Message = ({ message }) => (
   <section>
      <p>{message}</p>
   </section>
);

export default function PaymentApp() {
   const [message, setMessage] = useState("");

   useEffect(() => {
      const query = new URLSearchParams(window.location.search);

      if (query.get("success")) {
         setMessage("Order placed! You will receive an email confirmation.");
         localStorage.setItem("isPremiumUser", true);
      }

      if (query.get("canceled")) {
         setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
         );
      }
   }, []);

   return message ? (
      <Message message={message} />
   ) : (
      <ProductDisplay />
   );
}