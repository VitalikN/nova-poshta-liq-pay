import * as Yup from "yup";

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
  warehouse: Yup.string().required("Обов'язкове поле!"),
  paymentMethod: Yup.string().required("Оберіть спосіб оплати"),
});