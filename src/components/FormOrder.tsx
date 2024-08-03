"use client";

import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";
import * as Yup from "yup";

import s from "@/sass/layouts/order.module.scss";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Area, fetchAreas } from "@/api/fetchAreas";
import { City, fetchCities } from "@/api/fetchCities";

export interface FormValues {
  userName: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  area: string;
  city: string;
}

export const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "ім'я може містити від 3 до 50 символів")
    .max(50, "ім'я може містити від 3 до 50 символів")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ' -]+$/,
      "Ім’я може містити тільки букви, пробіли, апострофи і дефіси"
    )
    .required("Обов'язкове поле!"),

  lastName: Yup.string()
    .min(3, "Прізвище може містити від 3 до 50 символів")
    .max(50, "Прізвище може містити від 3 до 50 символів")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ' -]+$/,
      "Прізвище може містити тільки букви, пробіли, апострофи і дефіси"
    )
    .required("Обов'язкове поле!"),

  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Обов'язкове поле!")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Введіть дійсну електронну адресу у форматі username@example.com"
    ),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Номер телефону може містити тільки цифри")
    .min(10, "Номер телефону має містити не менше 10 цифр")
    .max(15, "Номер телефону має містити не більше 15 цифр")
    .required("Обов'язкове поле!"),
  area: Yup.string().required("Обов'язкове поле!"),
  city: Yup.string().required("Обов'язкове поле!"),
});

const FormOrder = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");

  useEffect(() => {
    const loadAreas = async () => {
      const fetchedAreas = await fetchAreas();

      if (fetchedAreas) {
        setAreas(fetchedAreas);
      }
    };

    loadAreas();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (selectedArea) {
        const fetchedCities = await fetchCities(selectedArea);
        console.log("Fetched Cities:", fetchedCities);
        if (fetchedCities) {
          setCities(fetchedCities);
        }
      } else {
        setCities([]);
      }
    };
    loadCities();
  }, [selectedArea]);

  const handleChangeArea = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const areaValue = e.target.value;
    setSelectedArea(areaValue);
    setFieldValue("area", areaValue);
    setCities([]); // Очищення списку міст при зміні області
    setFieldValue("city", ""); // Очищення вибраного міста
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form submitted", values);
    // resetForm();
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        area: "",
        city: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.form__box}>
            <Field
              className={`${s.input} ${
                touched.userName && errors.userName
                  ? s.invalid
                  : touched.userName && !errors.userName
                  ? s.valid
                  : ""
              }`}
              type="text"
              name="userName"
              placeholder="Ім’я"
              error={touched.userName && errors.userName}
            />
            <ErrorFeedback name="userName" />
          </div>

          <div className={s.form__box}>
            <Field
              className={`${s.input} ${
                touched.lastName && errors.lastName
                  ? s.invalid
                  : touched.lastName && !errors.lastName
                  ? s.valid
                  : ""
              }`}
              type="text"
              name="lastName"
              placeholder="Прізвище"
              error={touched.lastName && errors.lastName}
            />
            <ErrorFeedback name="lastName" />
          </div>

          <div className={s.form__box}>
            <Field
              className={`${s.input} ${
                touched.email && errors.email
                  ? s.invalid
                  : touched.email && !errors.email
                  ? s.valid
                  : ""
              }`}
              type="email"
              name="email"
              placeholder="Email"
              error={touched.email && errors.email}
            />

            <ErrorFeedback name="email" />
          </div>
          <div className={s.form__box}>
            <Field
              className={`${s.input} ${
                touched.phoneNumber && errors.phoneNumber
                  ? s.invalid
                  : touched.phoneNumber && !errors.phoneNumber
                  ? s.valid
                  : ""
              }`}
              type="tel"
              name="phoneNumber"
              placeholder="Номер телефону"
              error={touched.phoneNumber && errors.phoneNumber}
            />

            <ErrorFeedback name="phoneNumber" />
          </div>

          <div className={s.box__chip}>
            <svg width={182} height={72} className={s.chip}>
              <use href={`/symbol-defs.svg#nova`} />
            </svg>
          </div>

          {/* <div className={s.form__box}>
            <Field as="select" name="area" className={s.input}>
              <option value="" label="Область" />
              {areas.map(({ Description }, index) => (
                <option key={index} value={Description} label={Description} />
              ))}
            </Field>
            <ErrorFeedback name="area" />
          </div> */}
          <div className={s.form__box}>
            <Field
              as="select"
              name="area"
              className={s.input}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChangeArea(e, setFieldValue)
              }
            >
              <option value="" label="Область" />
              {areas.map(({ Description }, index) => (
                <option key={index} value={Description} label={Description} />
              ))}
            </Field>
            <ErrorFeedback name="area" />
          </div>

          <div className={s.form__box}>
            <Field
              as="select"
              name="city"
              className={s.input}
              disabled={!selectedArea}
            >
              <option value="" label="Місто" />
              {cities.map(({ Description }, index) => (
                <option key={index} value={Description} label={Description} />
              ))}
            </Field>
            <ErrorFeedback name="city" />
          </div>

          <div className={s.box__btn}>
            <Link
              href="/"
              className={`${s.styled__link} 
              `}
            >
              Продовжити покупки
            </Link>
            <button
              className={`${s.styled__btn} 
              `}
              type="submit"
            >
              Оформити замовлення
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default FormOrder;
