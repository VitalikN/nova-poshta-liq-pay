"use client";

import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";

import s from "@/sass/layouts/order.module.scss";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Area, fetchAreas } from "@/api/fetchAreas";
import { City, fetchCities } from "@/api/fetchCities";
import { fetchWarehouses, Warehouse } from "@/api/fetchWarehouses";
import { validationSchema } from "@/utils/validationSchema";
import { FormValues } from "@/utils/FormValues";
import { initialValues } from "@/utils/initialValues";

interface FormOrderProps {
  onPaymentMethodChange: (method: string) => void;
}

const FormOrder: React.FC<FormOrderProps> = ({ onPaymentMethodChange }) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

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
    if (selectedArea) {
      const loadCities = async () => {
        const fetchedCities = await fetchCities(selectedArea);
        setCities(fetchedCities || []);
      };
      loadCities();
    }
  }, [selectedArea]);

  useEffect(() => {
    const filtered = cities.filter((city) =>
      city.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm, cities]);

  useEffect(() => {
    const loadWarehouses = async () => {
      const fetchedWarehouses = await fetchWarehouses(searchTerm);
      setWarehouses(fetchedWarehouses);
    };

    if (searchTerm) {
      loadWarehouses();
    }
  }, [searchTerm]);

  const handleChangeArea = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const areaValue = e.target.value;
    setSelectedArea(areaValue);
    setFieldValue("area", areaValue);
    setSearchTerm("");
    setCities([]);
    setFilteredCities([]);
    setFieldValue("city", "");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSelectCity = (cityName: string, setFieldValue: any) => {
    setFieldValue("city", cityName);
    setSearchTerm(cityName);
    setFilteredCities([]);
  };
  const handlePaymentMethodChange = (method: string) => {
    onPaymentMethodChange(method);
    setSelectedPaymentMethod(method);
  };
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form submitted", values);
    // resetForm();
  };

  const handleFormSubmit = (values: FormValues, formikHelpers: any) => {
    if (selectedPaymentMethod === "Оплата онлайн картою") {
      const confirmed = window.confirm(
        "Ви впевнені, що хочете оплатити онлайн картою?"
      );
      if (confirmed) {
        handleSubmit(values, formikHelpers);
      }
    } else {
      handleSubmit(values, formikHelpers);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.form__box}>
            <Field
              className={s.input}
              type="text"
              name="userName"
              placeholder="Ім’я"
              error={touched.userName && errors.userName}
            />
            <ErrorFeedback name="userName" />
          </div>

          <div className={s.form__box}>
            <Field
              className={`${s.input} 
              `}
              type="text"
              name="lastName"
              placeholder="Прізвище"
              error={touched.lastName && errors.lastName}
            />
            <ErrorFeedback name="lastName" />
          </div>

          <div className={s.form__box}>
            <Field
              className={`${s.input} 
              `}
              type="email"
              name="email"
              placeholder="Email"
              error={touched.email && errors.email}
            />

            <ErrorFeedback name="email" />
          </div>
          <div className={s.form__box}>
            <Field
              className={`${s.input} `}
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

          <div className={s.form__box}>
            <Field
              as="select"
              name="area"
              className={`${s.input} ${s.select}`}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChangeArea(e, setFieldValue)
              }
            >
              <option value="" label="Область" className={s.option} />
              {areas.map(({ Description }, index) => (
                <option key={index} value={Description} label={Description} />
              ))}
            </Field>
            <ErrorFeedback name="area" />
          </div>

          <div className={s.form__box}>
            <Field
              className={`${s.input} ${!selectedArea ? s.disabled : ""}`}
              type="text"
              name="city"
              placeholder="Місто"
              value={searchTerm}
              onChange={handleSearch}
              disabled={!selectedArea}
              autoComplete="off"
            />
            <ErrorFeedback name="city" />
            {filteredCities.length > 0 && (
              <ul className={s.city__list}>
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className={s.city__item}
                    onClick={() =>
                      handleSelectCity(city.Description, setFieldValue)
                    }
                  >
                    {city.Description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={s.form__box}>
            <Field
              as="select"
              name="warehouse"
              className={`${s.input} ${s.select} ${
                !selectedArea || !searchTerm ? s.disabled : ""
              }`}
              disabled={!selectedArea || !searchTerm}
            >
              <option value="" label="Відділення" />
              {warehouses.map((warehouse, index) => (
                <option key={index} value={warehouse.Description}>
                  {warehouse.Description}
                </option>
              ))}
            </Field>
            <ErrorFeedback name="warehouse" />
          </div>

          <div className={`${s.form__box} ${s.form__box__radio}`}>
            <label className={` ${s.form__label}`}>
              <Field
                className={` ${s.form__radio}`}
                type="radio"
                name="paymentMethod"
                value="Оплата при отриманні"
                onClick={() =>
                  handlePaymentMethodChange("Оплата при отриманні")
                }
              />
              <span className={s.radio__custom}></span>
              Оплата при отриманні
            </label>
            <label className={` ${s.form__label}`}>
              <Field
                className={` ${s.form__radio}`}
                type="radio"
                name="paymentMethod"
                value="Оплата онлайн картою"
                onClick={() =>
                  handlePaymentMethodChange("Оплата онлайн картою")
                }
              />
              <span className={s.radio__custom}></span>
              Оплата онлайн картою
            </label>
            <ErrorFeedback name="paymentMethod" />
          </div>
          {/*  */}
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
