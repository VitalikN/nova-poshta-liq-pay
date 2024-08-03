"use client";
import s from "@/sass/layouts/order.module.scss";
import FormOrder from "./FormOrder";

const Order = () => {
  return (
    <section className={s.section__order}>
      <div className={`${s.container}  ${s.container__order}  `}>
        <div className={s.container__form}>
          <h2 className={s.title}>Дані для відправки</h2>
          <FormOrder />
        </div>

        <div>
          <ul>
            <li>Печиво шоколадне</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Order;
