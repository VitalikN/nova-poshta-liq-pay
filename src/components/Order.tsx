"use client";
import s from "@/sass/layouts/order.module.scss";
import FormOrder from "./FormOrder";
import { useState } from "react";

const Order = () => {
  const [totalPrice, setTotalPrice] = useState(200);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };
  return (
    <section className={s.section__order}>
      <div className={`${s.container}  ${s.container__order}  `}>
        <div className={s.container__form}>
          <h2 className={s.title}>Дані для відправки</h2>
          <FormOrder onPaymentMethodChange={handlePaymentMethodChange} />
        </div>

        <div>
          <h2>{totalPrice}грн</h2>
          {paymentMethod === "Оплата онлайн картою" && (
            <p>Будь ласка, заповніть дані для оплати онлайн.</p>
          )}
        </div>
      </div>
    </section>
  );
};
export default Order;
